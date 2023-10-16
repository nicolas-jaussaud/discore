import { move } from './move'

const init = (app, character) => ({
  currentAction: false,
  move: {
    isActive: false,
    resolution: false,
    animations: {
      start: (type = 'run') => {
        character.actions.move.isActive = true
        character.stopAnimation('idle')
        character.stopAnimation(type === 'run' ? 'walk' : 'run')
        character.startAnimation(type === 'run' ? 'run' : 'walk')
      },
      stop: () => {
        character.actions.move.isActive = false
        character.stopAnimation('run')
        character.stopAnimation('walk')
        character.startAnimation('idle')
      }
    },
    start: (x, y, z, type = 'run') => (
      new Promise(resolve => {
        move(app, { x: x, y: y, z: z }, character, type)
        character.actions.move.resolution = resolve
      })
    ),
    stop: () => {
      character.currentAction = false
      if( character.actions.move.resolution ) character.actions.move.resolution()
      character.actions.move.animations.stop()
    }
  }
})

export { init }
