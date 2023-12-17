import { 
  Clock,
  OrthographicCamera,
  WebGLRenderer
} from 'three'

import { render } from './render'
import { init as initHooks } from '../hooks'
import { init as initWorld } from '../world'
import { init as initMap } from '../map'
import { init as initCharacter } from '../character'
import { init as initControls } from '../controls'
import { init as initLoaders } from '../import'
import { init as initLoading } from './loading/'
import { init as initDebug } from './debug'

const init = ({
  element,
  width = window.innerWidth,
  height = window.innerHeight,
  squareSize = 200
}) => {
  
  const renderer = new WebGLRenderer()
  renderer.setSize(width, height)

  const camera = new OrthographicCamera(
    width / -2, 
    width / 2, 
    height / 2, 
    height / -2, 
    1, 
    1600
  )

  element.appendChild(renderer.domElement)

  const app = {
    renderer    : renderer,
    status      : 'started',
    environment : process.env.NODE_ENV ?? 'production',
    hooks       : initHooks(),
    camera      : camera,
    clock       : new Clock(),
    lights      : [],
    stop        : () => {
      app.clock.stop()
      app.status = 'paused'
    },
    start       : () => {
      app.clock.start()
      app.status = 'started'
      app.render()
    },
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

  if( app.environment === 'development' ) {
    initDebug(app)
  }

  app.loading = initLoading(app, element)
  app.loading.set('app', false)
  
  app.map = initMap(app, squareSize)
  app.loaders = initLoaders(app)
  app.characters = initCharacter(app)

  camera.position.set( 0, 0, 600 )
  app.view.set('orthographic')

  app.render = () => render(app, renderer)
  app.render()

  app.world = initWorld(app)

  const removeLoading = () => {
    app.loading.set('app', true)
    app.controls = initControls(app)
    app.hooks.removeAction('afterRender', removeLoading)
  }
  app.hooks.addAction('afterRender', removeLoading)
  
  return app
}

export default init
