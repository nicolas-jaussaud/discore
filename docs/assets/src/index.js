import discore from '../../../discore/src'

import {
  DirectionalLight,
  HemisphereLight,
  Color
} from 'three'

import { init as initMap } from './map'

const init = () => {

  const app = discore.app.init({
    element: document.getElementById('app'),
  })

  app.environment = 'dev'

  const map = initMap(app)
  discore.map.load(app, map)

  const sideLight = new DirectionalLight('rgb(200, 230, 255)', 0.8)
  const hemiLight = new HemisphereLight( 0x9999FF, 0x88ffFF, 0.7 ); 
  
  const folder = './assets/ressources/characters/main/'

  discore.character.setMainCharacter(app, {
    name       : 'Main character', 
    file       : folder + 'main.fbx',
    card       : folder + 'main.png',
    animations : {
      run : folder + '/animations/run.fbx', 
      idle: folder + '/animations/idle.fbx' 
    },
    attributes : {
      speed: 0.5
    }
  }, character => {
    character.object.scale.set(0.5, 0.5, 0.5)
    character.object.rotation.x = Math.PI / 2
  })

  sideLight.position.set(-7000000, 10000000, 100)
  sideLight.rotation.x = 0

  app.scene.add(hemiLight)
  app.scene.add(sideLight)

  app.scene.background = new Color( 0x55BBFF )

  window.app = app
} 

window.addEventListener('load', init)
