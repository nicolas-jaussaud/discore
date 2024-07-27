import Stats from 'stats.js'
import {
  AxesHelper,
  BoxHelper,
  MeshBasicMaterial,
  PlaneGeometry
} from 'three'
import { getPathMap } from '../map/path/map'

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

  /**
   * Make pathMap visible
   *
   * @see ./map/path/map.js
   */
  app.hooks.addAction('loadComplete', () => {

    const pathMap = getPathMap(app)

    for( const key in pathMap ) {
      app.debug.addPoint(
        { ...pathMap[ key ].coordinates, z: 0 },
        'path'
      )
    }
    app.world.instance.render(
      `_debug-point-path`,
      app.map.current.scene
    )
  })

  return {
    addPoint : (position, size) => addPoint(app, position, size)
  }
}

const addPoint = (app, position, type = 'default') => {

  const material = new MeshBasicMaterial({ color: 0xffa500 })
  const geometry = new PlaneGeometry(3, 3)

  app.world.instance.add(`_debug-point-${type}`, geometry, material, {
    position: { x: position.x, y: position.y, z: 1 }
  })
}

export { init }
