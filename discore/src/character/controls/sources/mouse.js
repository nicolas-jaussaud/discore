import { 
  Raycaster, 
  Vector2 
} from 'three'

const mouseEvents = app => {

  const raycaster = new Raycaster()
  const mouse = new Vector2()

  /**
   * Get position from the click event, and move the main character to this position
   */
  window.addEventListener('click', e => {

    const {
      innerWidth,
      innerHeight
    } = window

    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1

    /**
     * Set destination for character to the first intersection
     */
    raycaster.setFromCamera(mouse, app.camera)
    const intersects = raycaster.intersectObjects(app.scene.children)

    if( ! isWalkable(intersects[0] ?? false, app) ) return;

    app.controls.actions.run.move(
      intersects[0].point.x,
      intersects[0].point.y,
      intersects[0].point.z
    )
  })
}

/**
 * Check if the clicked object is walkable
 */
const isWalkable = (intersect, app) => {

  if( ! intersect || ! intersect.point ) return false

  if( intersect.object.walkable === false || intersect.object.parent.walkable === false ) {
    return false
  }
  
  const square = app.map.getSquareByCoordinates(intersect.point)
  
  if( ! square ) return false

  const squareType = app.map.getSquareType(square.type ?? false)

  return squareType ? squareType.walkable : false
}

export {
  mouseEvents
}
