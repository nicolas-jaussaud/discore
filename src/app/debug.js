import Stats from 'stats.js'
import { 
  AxesHelper, 
  BoxHelper 
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
    app.map.current.scene.add(boxes[object.uuid])
  }

  app.hooks.addAction('beforeRender', () => {

    app.map.current?.objects?.map(action)

    const characters = app.characters.getAll()
    for( const name in app.characters.getAll() ) {
      action(characters[name].object)
    }
  })
}

export { init }
