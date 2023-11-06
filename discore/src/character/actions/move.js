import { Vector3 } from 'three'

const move = (app, coordinates, character, type) => {

  const speed = character.attributes.speed[ type ]
  const action = character.actions.move

  if( action.isActive ) action.stop()

  const targetPosition = new Vector3(
    coordinates.x, 
    coordinates.y, 
    coordinates.z
  )

  /**
   * Needed to make sure we rotate on the right axis when using lookAt()
   * 
   * @see https://threejs.org/docs/#api/en/core/Object3D.up
   */
  character.object.up = new Vector3(0, 0, 1)
  
  const actionId = character.actions.currentAction = Date.now()
  
  const update = timestamp => {

    if( app.status === 'paused' ) {
      lastTimestamp = timestamp
      requestAnimationFrame(update)
      return;      
    }

    if( character.actions.currentAction !== actionId ) {
      action.stop()
      return;
    }
        
    if( ! action.isActive ) action.animations.start(type)
    
    const deltaTime = timestamp - lastTimestamp
    lastTimestamp = timestamp

    const distance = speed * deltaTime
    const distanceRemaining = character.object.position.distanceTo(targetPosition)
    
    if( distanceRemaining <= distance ) {
      character.object.position.copy(targetPosition) // Position might not be exactly right
      action.stop()
      return;
    }

    const deltaDistance = targetPosition.clone().sub(character.object.position)
    const direction = deltaDistance.normalize()
    
    /**
     * We use this vector to check if we should move the character to the next position, before
     * actually moving it
     * 
     * We use distance * 3 for this check by security, because we want to avoid being in a situation where 
     * the character is at the absolute edge of the map (it can be hard to move back from there)
     */
    const distanceCheck = new Vector3(
      character.object.position.x,
      character.object.position.y,
      character.object.position.z
    )
    distanceCheck.add( direction.clone().multiplyScalar(distance * 3) )

    const nextSquare = app.map.getSquareByCoordinates(distanceCheck)
    if( nextSquare === false ) {
      action.stop()
      return;
    }

    const squareType = app.map.getSquareType(nextSquare.type ?? false)  
    if( ! squareType || squareType.walkable === false ) {
      action.stop()
      return;
    }

    if( app.world.hasCollisions(distanceCheck) ) {
      action.stop()
      return;
    }

    character.object.position.add( direction.multiplyScalar(distance) )
    character.object.lookAt(targetPosition)
    
    requestAnimationFrame(update)

    app.hooks.doAction('characterMoved', { 'character': character })
  }

  let lastTimestamp = performance.now()
  requestAnimationFrame(update)
}

export { move }
