import discore from '../../../../discore/src'

import { renderGrass } from './grass'
import { renderWater } from './water'
import { renderTree } from './tree'
import { renderPath } from './path'

const registerSquares = app =>  {

  discore.map.registerSquareType(app, 'grass', {
    render   : renderGrass,
    walkable : true
  })

  discore.map.registerSquareType(app, 'water', {
    render   : renderWater,
    walkable : false
  })

  discore.map.registerSquareType(app, 'tree', {
    render   : renderTree,
    walkable : true
  })

  discore.map.registerSquareType(app, 'path', {
    render   : renderPath,
    walkable : true
  })
}

export { 
  registerSquares,
}
