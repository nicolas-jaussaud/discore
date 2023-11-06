import discore from '../../../discore/src'
import discursed from '../../../discursed/src'

import {
  DirectionalLight,
  HemisphereLight
} from 'three'

import { registerSquares } from './squares'
import { init as initCharacters } from './characters'
import { init as initConversations } from './conversations/'

const init = () => {

  /**
   * @see ./discore/src
   */
  const app = discore.init({
    element: document.getElementById('app')
  })

  /**
   * @see ./discursed/src
   */
  const discussions = discursed.init({
    element: document.getElementById('discussions')
  })

  registerSquares(app)

  initCharacters(app)
  initConversations(app, discussions)

  const sideLight = new DirectionalLight('rgb(200, 230, 255)', 0.3)
  const hemiLight = new HemisphereLight(0x9999FF, 0x88ffFF, 0.7)
  
  sideLight.position.set(7000000, -10000000, 10000000)
  sideLight.rotation.x = 0

  app.lights.push(hemiLight)
  app.lights.push(sideLight)

  window.app = app
} 

window.addEventListener('load', init)
