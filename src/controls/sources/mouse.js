import { 
  Raycaster, 
  Vector2,
  Box3
} from 'three'

const raycaster = new Raycaster()
const mouse = new Vector2()

const mouseEvents = app => {

  /**
   * Get position from the click event, and move the main character to this position
   */
  window.addEventListener('click', e => {
    
    if( ! initRaycasterFromEvent(app, e) ) return;

    /**
     * If click on character, callback to talk to trigger an action on click and when arriving
     */
    const character =  collideWithCharacter(app)
    if( character ) {
      app.hooks.doAction('clickOnCharacter', character)
      return;
    }

    /**
     * Set destination for character to the first intersection
     */
    const walkableArea = collideWithWalkableArea(app)
    if( ! walkableArea ) return;

    app.characters.getMain().actions.move.start(
      walkableArea.point.x,
      walkableArea.point.y,
      walkableArea.point.z,
    )
  })

  window.addEventListener('mousemove', e => {

    document.body.style.cursor = ''

    if( ! initRaycasterFromEvent(app, e) ) return;

    const character =  collideWithCharacter(app)
    if( character ) {
      app.hooks.doAction('mouseOnCharacter', character)
      document.body.style.cursor = 'help'
      return;
    }

    if( ! collideWithWalkableArea(app) ) {
      document.body.style.cursor = 'not-allowed'
    }
  })
}

const initRaycasterFromEvent = (app, e) => {

  if( app.status === 'paused' ) return false;
    
  const {
    innerWidth,
    innerHeight
  } = window

  mouse.x = (e.clientX / innerWidth) * 2 - 1
  mouse.y = -(e.clientY / innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, app.camera)
  
  return true
}

const collideWithCharacter = app => {

  const characters = app?.characters.getAll()

  for( const name in characters ) {      
    
    const character = characters[ name ]
    const hitBox = new Box3().setFromObject(character.object)

    if( raycaster.ray.intersectsBox(hitBox) ) return character;
  }

  return false
}

const collideWithWalkableArea = app => {
  const intersects = raycaster.intersectObjects(app.map.current.scene.children)
  return isWalkable(intersects[0] ?? false, app) ? intersects[0] : false 
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
