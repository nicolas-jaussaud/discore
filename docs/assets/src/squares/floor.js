import discore from '../../../../discore/src'

import { moveOnSquare } from './'

const renderFloor = ({
  coordinates,
  app,
  config
}) => {
  discore.world.add(
    `./assets/ressources/world/floors/floor-${config.type}.fbx`,
    { walkable: true },
    floor => {

      moveOnSquare(floor, coordinates)
      
      floor.scale.set( 1.1, 1.1, 1.1 )
      floor.rotation.x = Math.PI / 2
      floor.position.z = -10
    
      switch(config.position) {
        case 'top-right':
        case 'right-corner':
          floor.rotation.y = -(Math.PI / 2)
          break;
        case 'bottom-right':
        case 'bottom-corner':
          floor.rotation.y = Math.PI
          break;
        case 'left-corner':
        case 'bottom-left':
          floor.rotation.y = Math.PI / 2
          break;
      }
      
      app.scene.add(floor)
    }
  )
}

export { renderFloor }
