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

  camera.position.set( 0, 0, 200 )
  camera.rotateZ(Math.PI / 4)
  camera.rotateX(Math.PI / 4)
    
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
    clock: new Clock()
  }

  app.render = () => render(app, renderer)
  app.render()

  return app
}

export default {
  init: init
}
