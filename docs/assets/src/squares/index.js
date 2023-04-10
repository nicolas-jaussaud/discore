import discore from '../../../../discore/src'

import { renderWall } from './wall'
import { renderFloor } from './floor'

const registerSquares = app =>  {

  discore.map.registerSquareType(app, 'floor', {
    render : renderFloor
  })

  discore.map.registerSquareType(app, 'wall', {
    render : renderWall
  })

}

/**
 * Help function to move object in loaded square 
 */
const moveOnSquare = (object, coordinates, position = 'center') => {
  switch(position) {
    case 'center':
      object.position.x = (coordinates.x[1] + coordinates.x[0]) / 2
      object.position.y = (coordinates.y[1] + coordinates.y[0]) / 2
      break;
    case 'top-right':
      object.position.x = (coordinates.x[1] + coordinates.x[0]) / 2
      object.position.y = coordinates.y[1]
      break;
    case 'top-left':
      object.position.x = coordinates.x[0]
      object.position.y = (coordinates.y[1] + coordinates.y[0]) / 2
      break;
    case 'top-corner':
      object.position.x = coordinates.x[0]
      object.position.y = coordinates.y[1]
      break;
    case 'bottom-corner':
      object.position.x = coordinates.x[0]
      object.position.y = coordinates.y[1]
      break;
    case 'left-corner':
      object.position.x = coordinates.x[0]
      object.position.y = coordinates.y[0]
      break;
    case 'right-corner':
      object.position.x = coordinates.x[1]
      object.position.y = coordinates.y[1]
      break;
  }
  object.position.z = 0
}

export { 
  registerSquares,
  moveOnSquare 
}
