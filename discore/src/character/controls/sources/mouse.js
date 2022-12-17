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
    
    if( intersects.length <= 0 ) return;
    
    app.controls.actions.run.move(
      intersects[0].point.x,
      intersects[0].point.y,
      intersects[0].point.z
    )

  })
}

export {
  mouseEvents
}
