import { Vector3 } from 'three'
import { getPathMap } from './map'

/**
 * Returns a list of nodes
 */
const searchPath = (app, currentPosition, targetPosition) => {

  const pathMap = structuredClone(getPathMap(app))

  const startNode = getClosestNode(app, currentPosition, pathMap)
  const targetNode = getClosestNode(app, targetPosition, pathMap)

  if( ! startNode || ! targetNode ) {
    return [
      currentPosition,
      targetPosition
    ]
  }

  /**
   * A* to calculate shortest path from our path map
   * 
   * @see https://en.wikipedia.org/wiki/A*_search_algorithm#Pseudocode
   */

  // No great to use an array for this, but that will do for now
  const openList = [ startNode ]
  const cameFrom = {}

  const gScore = {}
  gScore[ startNode.key ] = 0

  const fScore = {}
  fScore[ startNode.key ] = startNode.distance = getDistance(startNode, targetNode)

  while( openList.length > 0 ) {

    const current = getLowestF(openList)

    if( current.node.key === targetNode.key ) {
      return getPath(
        current.node, 
        startNode, 
        cameFrom,
        targetPosition,
        pathMap
      )
    }

    openList.splice(current.index, 1)
    
    for( const neighborKey in current.node.neighbors ) {

      const neighbor = current.node.neighbors[ neighborKey ]
      const neighborDistance = getDistance(current.node, neighbor)
      const neighborGScore = gScore[ current.node.key ] + neighborDistance

      if( gScore[ neighbor.key ] && neighborGScore >= gScore[ neighbor.key ] ) {
        continue; // Not better than current
      }

      cameFrom[ neighbor.key ] = current.node.key
      gScore[ neighbor.key ] = neighborGScore
      fScore[ neighbor.key ] = neighborGScore + getDistance(neighbor, targetNode)

      const listHasNeighbor = openList.some(node => node.key === neighbor.key)
      if( ! listHasNeighbor ) openList.push(neighbor)
    }    
  }

  return [
    currentPosition,
    targetPosition
  ]
}

const getPath = (
  lastNode, 
  startNode, 
  cameFrom,
  // Last node !== target position, position = exact target
  targetPosition,
  pathMap
) => {

  const path = [ 
    new Vector3(
      lastNode.coordinates.x,
      lastNode.coordinates.y,
      0
    ),
    targetPosition
  ]

  let previousNode = lastNode.key
  while( previousNode !== startNode.key ) {
    previousNode = cameFrom[ previousNode ]
    path.unshift(
      new Vector3(
        pathMap[ previousNode ].coordinates.x,
        pathMap[ previousNode ].coordinates.y,
        0
      )
    )
  }

  /**
   * Remove node that are on an (almost) straight line
   */
  return path.filter((node, index) => {

    const getNormalized = vector => ({
      x: Number((vector.clone().normalize().x)).toFixed(2),
      y: Number((vector.clone().normalize().y)).toFixed(2)
    })

    const current = getNormalized(node)
    if( index === 0 || index === (path.length - 1) ) {
      return true;
    }

    const previous =getNormalized(path[index - 1])  
    if( previous.x !== current.x || previous.y !== current.y ) {
      return true;
    }

    const next =getNormalized(path[index + 1])  
    if( next.x !== current.x || next.y !== current.y ) {
      return true;
    }

    return false;
  })
}

const getLowestF = list => (
  list.reduce(
    (lowF, node, index) => ( 
      node.distance < lowF.node.distance 
        ? { index, node }
        : lowF
    ),
    { index: 0, node: list[0] }
  )
)

const getDistance = (node, target) => (
  new Vector3(
    node.coordinates.x, 
    node.coordinates.y,
    0
  ).distanceTo(
    new Vector3(
      target.coordinates.x, 
      target.coordinates.y, 
      0
    )
  )
)

const getClosestNode = (app, coordinates, pathMap) => {

  // Shouldn't be harcoded but it is ¯\_(ツ)_/¯
  const nodeDistance = app.map.squareSize / 16 
  
  const lowY = Math.floor( coordinates.y / nodeDistance ) * nodeDistance
  const lowX = Math.floor( coordinates.x / nodeDistance ) * nodeDistance

  let potentialNeighbors = [
    `${lowX               }|${lowY               }`,
    `${lowX               }|${lowY + nodeDistance}`,
    `${lowX + nodeDistance}|${lowY + nodeDistance}`,
    `${lowX + nodeDistance}|${lowY               }`,
  ]

  let neighbor = false
  potentialNeighbors.forEach(key => {
    
    if( ! pathMap[key] ) return;
    if( ! neighbor ) return neighbor = pathMap[key];

    const isClosest = 
      getDistance({ coordinates }, pathMap[key])
      <
      getDistance({ coordinates }, neighbor)

    if( isClosest ) neighbor = pathMap[key]
  })

  if( neighbor !== false ) return neighbor

  /**
   * This is very bad and I'm not ashamed at all
   * 
   * It should be fixed at some point tho, when we use this fallback path finding is
   * at least 3* slower
   * 
   * I tried to write something that looks for the closest nodes first, but I ran into
   * weird references issue and I really want to finish this today so, again, ¯\_(ツ)_/¯ 
   */
  for( const key in pathMap ) {

    if( ! pathMap[key] ) continue;
    if( ! neighbor ) {
      neighbor = pathMap[key]
      continue;
    }

    const isClosest = 
      getDistance({ coordinates }, pathMap[key])
      <
      getDistance({ coordinates }, neighbor)

    if( isClosest ) neighbor = pathMap[key]
  }

  return neighbor
}

export {
  searchPath
}
