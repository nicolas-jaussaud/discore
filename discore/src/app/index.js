import { 
  Clock,
  OrthographicCamera,
  Scene,
  WebGLRenderer
 } from 'three'

import { render } from './render'
import { init as initHooks } from '../hooks'

const init = ({
  element,
  width = window.innerWidth,
  height = window.innerHeight,
}) => {
  
  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)

  const camera = new OrthographicCamera(
    width / - 2, 
    width / 2, 
    height / 2, 
    height / - 2, 
    1, 
    1000
  )

  const scene = new Scene()
  scene.add( camera )

  element.appendChild(renderer.domElement)

  const app = {
    environment: 'live',
    hooks: initHooks(),
    scene: scene,
    camera: camera,
    characters: {
      main: false,
      side: []
    },
    map: {
      squareTypes: []
    },
    clock: new Clock(),
    view: {
      set: view => {
        app.view.current = view
        app.camera.rotation.set(0,0,0) // Reset
        switch(view) {
          case 'top':
            app.camera.rotateZ(Math.PI / 4)
            break
          case 'orthographic':
            app.camera.rotateZ(Math.PI / 4)
            app.camera.rotateX(Math.PI / 4)
            break
        }
      }
    }
  }
  
  camera.position.set( 0, 0, 400 )
  app.view.set('orthographic')

  app.render = () => render(app, renderer)
  app.render()

  return app
}

export default {
  init: init
}
