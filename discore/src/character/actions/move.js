import { Vector3 } from 'three'

const move = (app, coordinates) => {

  const character = app.characters.main.object
  const speed = app.characters.main.attributes.speed
  const run = app.controls.actions.run

  if( run.isActive ) run.stop()

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
  character.up = new Vector3(0, 0, 1)
  
  const actionId = app.controls.actions.currentAction = Date.now()
  
  const update = timestamp => {

    if( app.controls.actions.currentAction !== actionId ) {
      run.stop()
      return;
    }

    if( ! run.isActive ) run.animations.start()

    const deltaTime = timestamp - lastTimestamp
    lastTimestamp = timestamp

    const distance = speed * deltaTime
    const distanceRemaining = character.position.distanceTo(targetPosition)
    
    if( distanceRemaining <= distance ) {
      character.position.copy(targetPosition) // Position might not be exactly right
      run.stop()
      return;
    }

    const deltaDistance = targetPosition.clone().sub(character.position)
    const direction = deltaDistance.normalize()
    
    /**
     * We use this vector to check if we should move the character to the next position, before
     * actually moving it
     * 
     * We use distance * 3 for this check by security, because we want to avoid being in a situation where 
     * the character is at the absolute edge of the map (it can be hard to move back from there)
     */
    const distanceCheck = new Vector3(
      character.position.x,
      character.position.y,
      character.position.z
    )
    distanceCheck.add( direction.clone().multiplyScalar(distance * 3) )

    const nextSquare = app.map.getSquareByCoordinates(distanceCheck)
    if( nextSquare === false ) {
      run.stop()
      return;
    }

    const squareType = app.map.getSquareType(nextSquare.type ?? false)  
    if( ! squareType || squareType.walkable === false ) {
      run.stop()
      return;
    }

    if( app.world.hasCollisions(distanceCheck) ) {
      run.stop()
      return;
    }

    character.position.add( direction.multiplyScalar(distance) )
    character.lookAt(targetPosition)

    requestAnimationFrame(update)

    app.hooks.doAction('characterMoved', { 'character': character })
  }

  let lastTimestamp = performance.now()
  requestAnimationFrame(update)
}

export { move }
