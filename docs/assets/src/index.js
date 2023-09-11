import discore from '../../../discore/src'

import {
  DirectionalLight,
  HemisphereLight
} from 'three'

import maps from './maps/'
import { registerSquares } from './squares'

const init = () => {

  const app = discore.app.init({
    element: document.getElementById('app')
  })

  registerSquares(app)

  const folder = './assets/ressources/characters/main/'

  discore.character.setMainCharacter(app, {
    name       : 'Main character', 
    file       : folder + 'main.fbx',
    card       : folder + 'main.png',
    animations : {
      run  : folder + '/animations/run.fbx', 
      idle : folder + '/animations/idle.fbx' 
    },
    attributes : {
      speed: 0.5
    }
  }, character => {

    character.object.scale.set(0.5, 0.5, 0.5)
    character.object.rotation.x = Math.PI / 2

    app.map.load('map1', maps['map1'], '0|0')
  })

  const sideLight = new DirectionalLight('rgb(200, 230, 255)', 0.3)
  const hemiLight = new HemisphereLight( 0x9999FF, 0x88ffFF, 0.7 ); 
  
  sideLight.position.set(7000000, -10000000, 10000000)
  sideLight.rotation.x = 0

  app.lights.push(hemiLight)
  app.lights.push(sideLight)

  window.app = app
} 

window.addEventListener('load', init)
