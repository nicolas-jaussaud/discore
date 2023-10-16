import discore from '../../../discore/src'

import {
  DirectionalLight,
  HemisphereLight
} from 'three'

import { registerSquares } from './squares'
import { init as initCharacters } from './characters'

const init = () => {

  const app = discore.init({
    element: document.getElementById('app')
  })

  registerSquares(app)

  initCharacters(app)

  const sideLight = new DirectionalLight('rgb(200, 230, 255)', 0.3)
  const hemiLight = new HemisphereLight( 0x9999FF, 0x88ffFF, 0.7 ); 
  
  sideLight.position.set(7000000, -10000000, 10000000)
  sideLight.rotation.x = 0

  app.lights.push(hemiLight)
  app.lights.push(sideLight)

  window.app = app
} 

window.addEventListener('load', init)
