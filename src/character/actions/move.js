import { 
  Vector3,
  LineBasicMaterial,
  Line,
  BufferGeometry
} from 'three'

const move = async (app, coordinates, character, type) => {

  const speed = character.attributes.speed[ type ]
  const action = character.actions.move

  if( action.isActive ) action.stop()

  let startTime = false
  if( app.environment === 'development' ) {
    startTime = performance.now()
  }

  const nodes = app.map.searchPath(
    character.object.position,
    new Vector3(
      coordinates.x, 
      coordinates.y, 
      coordinates.z
    )
  )

  if( app.environment === 'development' ) {

    console.info(`Path finding for ${character.name} took ${performance.now() - startTime} milliseconds`)

    if( app.debug.path ) app.debug.path.removeFromParent()
    
    const material = new LineBasicMaterial( { color: 0xFF0000 } )
    const geometry = new BufferGeometry().setFromPoints( 
      nodes.map(node => ({ ...node, z: 3 })) 
    )

    app.debug.path = new Line( geometry, material )
    app.map.current.scene.add( app.debug.path )
  }

  /**
   * Needed to make sure we rotate on the right axis when using lookAt()
   * 
   * @see https://threejs.org/docs/#api/en/core/Object3D.up
   */
  character.object.up = new Vector3(0, 0, 1)

  const actionId = character.actions.currentAction = Date.now()
  
  let index = 0
  let currentTarget = nodes[ index ]
  const nextNode = () => {
    index++
    currentTarget = nodes[ index ] ?? false
    return currentTarget
  }

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

    let distance = speed * deltaTime
    let deltaDistance = currentTarget.clone().sub(character.object.position)
    let distanceRemaining = character.object.position.distanceTo(currentTarget)

    /**
     * If the distance remaining to the next node is less the total distance
     * we can do during this frame, we have to use the surplus to go to the 
     * next nodes, until we move as far as needed
     */
    while( distanceRemaining <= distance ) {

      distance = distance - distanceRemaining
      character.object.position.add( deltaDistance.normalize().multiplyScalar(distanceRemaining) )

      /**
       * If no next node, we are on target and can stop
       */
      if( nextNode() === false ) {
        return action.stop()
      } 
  
      deltaDistance = currentTarget.clone().sub(character.object.position)
      distanceRemaining = character.object.position.distanceTo(currentTarget)
    }

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
      return action.stop()
    }

    if( app.world.hasCollisions(distanceCheck) ) {
      return action.stop()
    }

    character.object.position.add( direction.multiplyScalar(distance) )
    character.object.lookAt(currentTarget)
    
    requestAnimationFrame(update)

    app.hooks.doAction('characterMoved', { 'character': character })
  }

  let lastTimestamp = performance.now()
  requestAnimationFrame(update)
}

export { move }
