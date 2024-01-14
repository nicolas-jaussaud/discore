import Stats from 'stats.js'
import { 
  AxesHelper, 
  BoxHelper,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Points
} from 'three'

const init = app => {

  /**
   * @see https://github.com/mrdoob/stats.js/
   */
  const stats = new Stats()

  document.body.appendChild(stats.dom)
  stats.dom.childNodes.forEach(
    node => node.style.display = 'initial'
  )
  
  app.hooks.addAction('beforeRender', stats.begin)
  app.hooks.addAction('afterRender', stats.end)
  
  /**
   * @see https://threejs.org/docs/#api/en/helpers/AxesHelper
   */
  app.hooks.addAction('mapLoaded', () => {
    app.map.current.scene.add( 
      new AxesHelper(window.innerHeight) 
    )
  })

  /**
   * Visible hitboxes for world and character objects
   *   
   * @see https://threejs.org/docs/#api/en/helpers/BoxHelper
   */
  const boxes = {}
  const action = object => {
      
    if( boxes[object.uuid] ) {
      return boxes[object.uuid].update()
    }

    boxes[object.uuid] = new BoxHelper(object, 0xffff00)
    if( app.map.current.scene ) {
      app.map.current.scene.add(boxes[object.uuid])
    }
  }

  app.hooks.addAction('beforeRender', () => {

    app.map.current?.objects?.map(action)

    const characters = app.characters.getAll()
    for( const name in app.characters.getAll() ) {
      action(characters[name].object)
    }
  })

  return {
    addPoint : (position, size) => addPoint(app, position, size)
  }
}

const addPoint = (app, position, size = 1) => {
  
  const material = new PointsMaterial({ size: size, color: 0xffa500 })
  const geometry = new BufferGeometry()
  
  geometry.setAttribute(
    'position', 
    new BufferAttribute( new Float32Array([ position.x, position.y, position.z ]), 3 )
  )

  const dot = new Points(geometry, material)
  app.map.current.scene.add(dot)
}
export { init }
