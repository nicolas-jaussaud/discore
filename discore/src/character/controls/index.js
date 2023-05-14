import { mouseEvents } from './sources/mouse'
import { keyboardEvents } from './sources/keyboard'
import { Vector3 } from 'three'

const init = app => ({
  sources: {
    mouse: mouseEvents(app),
    keyboard: keyboardEvents(app) 
  },
  actions: {
    run: {
      isMoving: false,
      animations: {
        start: () => {
          app.controls.actions.run.isMoving = true
          app.characters.main.stopAnimation('idle')
          app.characters.main.startAnimation('run')
        },
        stop: () => {
          app.controls.actions.run.isMoving = false
          app.characters.main.stopAnimation('run')
          app.characters.main.startAnimation('idle')
        }
      },
      move: (x, y, z) => {
        
        /**
         * We don't handle changing direction while moving currently
         */
        if( app.controls.actions.run.isMoving ) {
          return;
        }
        
        const character = app.characters.main.object
        const speed = app.characters.main.attributes.speed
        const animations = app.controls.actions.run.animations

        const targetPosition = new Vector3(x, y, z)

        /**
         * Needed to make sure we rotate on the right axis when using lookAt()
         * 
         * @see https://threejs.org/docs/#api/en/core/Object3D.up
         */
        character.up = new Vector3(0, 0, 1)
        
        animations.start()
    
        const update = timestamp => {

          const deltaTime = timestamp - lastTimestamp
          lastTimestamp = timestamp

          const distance = speed * deltaTime
          const distanceRemaining = character.position.distanceTo(targetPosition)
          
          if( distanceRemaining <= distance ) {
            character.position.copy(targetPosition) // Position might not be exactly right
            animations.stop()
            return;
          }

          const deltaDistance = targetPosition.clone().sub(character.position)
          const direction = deltaDistance.normalize()

          character.position.add( direction.multiplyScalar(distance) )
          character.lookAt(targetPosition)
          
          requestAnimationFrame(update)
        }
    
        let lastTimestamp = performance.now()
        requestAnimationFrame(update)
      }
    }
  }
})

export { init }
