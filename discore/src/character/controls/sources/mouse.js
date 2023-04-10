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
    
    if( ! isWalkable(intersects[0] ?? false) ) return;

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
const isWalkable = intersect => {

  if( ! intersect || ! intersect.object ) return false
  if( intersect.object.walkable === true ) return true

  return intersect.object.parent
    ? (intersect.object.parent?.walkable === true)
    : false
}

export {
  mouseEvents
}
