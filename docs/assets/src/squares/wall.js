import discore from '../../../../discore/src'

import { moveOnSquare } from './'
import { renderFloor } from './floor'

const renderWall = ({
  coordinates,
  app,
  config
}) => {
  
  /**
   * @see ./floor.js
   */
  renderFloor({
    coordinates, 
    app,
    config: { 
      type: config.position.includes('corner') ? 'corner' : 'side',
      position: config.position 
    }
  })

  /**
   * We don't render wall on bottom
   */
  if( config.position.startsWith('bottom-') ) return;

  discore.load(`./assets/ressources/world/walls/wall-${config.type}.fbx`, wall => {

    wall.scale.set( 0.55, 0.55, 0.55 )
    wall.rotation.x = Math.PI / 2

    switch(config.position) {
      case 'top-left':
      case 'left-corner':
        moveOnSquare(wall, coordinates, 'top-left')
        wall.rotation.y = Math.PI / 2
        break;
      case 'top-right':
      case 'right-corner':
        moveOnSquare(wall, coordinates, 'top-right')
        break
      case 'top-corner':
        renderSecondWall(wall.clone(), coordinates)
        moveOnSquare(wall, coordinates, 'top-left')
        wall.rotation.y = Math.PI / 2
        break
    }
  
    app.scene.add(wall)

    if( config.column ) {
      renderColumn(config.column, coordinates)
    }    
  })
}

/**
 * If position is top-corner we need to add a second wall
 */
const renderSecondWall = (wall, coordinates) => {
  moveOnSquare(wall, coordinates, 'top-right')
  app.scene.add(wall)
}

/**
 * Adds a column according to set position
 */
const renderColumn = (config, coordinates) => {
  discore.load(`./assets/ressources/world/columns/column-${config.type}.fbx`, column => {

    column.scale.set( 0.5, 0.5, 0.5 )
    column.rotation.x = Math.PI / 2

    moveOnSquare(column, coordinates, config.position)

    app.scene.add(column)
  })
}

export { renderWall }
