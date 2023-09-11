import discore from '../../../../discore/src'

import { renderGrass } from './grass'
import { renderWater } from './water'
import { renderTree } from './tree'
import { renderPath } from './path'
import { renderExitPath } from './path-exit'

const registerSquares = app =>  {

  app.map.registerSquareType('grass', {
    render   : renderGrass,
    walkable : true
  })

  app.map.registerSquareType('water', {
    render   : renderWater,
    walkable : false
  })

  app.map.registerSquareType('tree', {
    render   : renderTree,
    walkable : true
  })

  app.map.registerSquareType('path', {
    render   : renderPath,
    walkable : true
  })

  app.map.registerSquareType('path-exit', {
    render   : renderExitPath,
    walkable : true
  })
}

export { 
  registerSquares,
}
