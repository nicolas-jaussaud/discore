import {
  Box3,
  Vector3
} from 'three'

const getPathMap = app => (
  app.world.cache.get(`_path-map-${app.map.current.name}`, () => {
    
    app.loading.set(`path-map: ${app.map.current.name}`, false)

    const nodeDistance = app.map.squareSize / 16

    /**
     * Max distance between character and objects
     * Use to remove node when collisions/unallowed square next
     */
    const characterDimensions = app.world.cache.get('_main-character-max-obstacle-distance', () => {
          
      const characterHitBox = new Box3().setFromObject(app.characters.getMain().object)
      const size = {
        x: characterHitBox.max.x - characterHitBox.min.x,
        y: characterHitBox.max.y - characterHitBox.min.y,
        z: characterHitBox.max.z - characterHitBox.min.z
      }
      
      size.x = Math.max(size.x, size.y) * 1.5  
      size.y = Math.max(size.x, size.y) * 1.5

      return size
    })

    /**
     * This is slow, there is probably a way to make it faster (remove spread operator?)
     */
    const nodes = Object.keys(app.map.current.squares)
      .filter(app.map.isSquareWalkable)
      .map(key => app.map.getCoordinateBySquare(key))
      .reduce((nodes, center) => [
        ...nodes,
        center,
        ...(
          [ 
            nodeDistance,
            nodeDistance * 2, 
            nodeDistance * 3, 
            nodeDistance * 4, 
            nodeDistance * 5, 
            nodeDistance * 6, 
            nodeDistance * 7, 
            nodeDistance * 8 
          ].reduce((nodes, maxPosition, row) => {
            
            /**
             * On a side where the neigbours square is not walkable, we can only start
             * adding nodes if the distance between the side is and the node is superior
             * to character hitbox / 2 
             */
            const distanceFromSide = (app.map.squareSize / 2) - maxPosition 
            const safeFromSide = distanceFromSide > (characterDimensions.x / 2)
            const isSideSafe = {
              top         : safeFromSide || app.map.isNeighborsWalkable(center, 'top'), 
              bottom      : safeFromSide || app.map.isNeighborsWalkable(center, 'bottom'), 
              right       : safeFromSide || app.map.isNeighborsWalkable(center, 'right'), 
              left        : safeFromSide || app.map.isNeighborsWalkable(center, 'left'),
              topLeft     : safeFromSide || app.map.isNeighborsWalkable(center, 'top-left'), 
              topRight    : safeFromSide || app.map.isNeighborsWalkable(center, 'top-right'), 
              bottomLeft  : safeFromSide || app.map.isNeighborsWalkable(center, 'bottom-left'), 
              bottomRight : safeFromSide || app.map.isNeighborsWalkable(center, 'bottom-right'), 
            }

            /**
             * Side and center nodes on the current position:
             * 
             *  x . . x . . x
             *  . . . . . . .
             *  . . . . . . .
             *  x . . . . . x
             *  . . . . . . .
             *  . . . . . . .
             *  x . . x . . x
             */

            if( isSideSafe.top ) {
              nodes.push({ x: center.x              , y: center.y + maxPosition })
            }
            if( isSideSafe.top && isSideSafe.left && isSideSafe.topLeft ) {
              nodes.push({ x: center.x - maxPosition, y: center.y + maxPosition })            
            }
            if( isSideSafe.top && isSideSafe.right && isSideSafe.topRight ) {
              nodes.push({ x: center.x + maxPosition, y: center.y + maxPosition })
            }
            if( isSideSafe.bottom ) {
              nodes.push({ x: center.x              , y: center.y - maxPosition })
            }
            if( isSideSafe.bottom && isSideSafe.left && isSideSafe.bottomLeft ) {
              nodes.push({ x: center.x - maxPosition, y: center.y - maxPosition })            
            }
            if( isSideSafe.bottom && isSideSafe.right && isSideSafe.bottomRight ) {
              nodes.push({ x: center.x + maxPosition, y: center.y - maxPosition })
            }
            if( isSideSafe.right ) {
              nodes.push({ x: center.x + maxPosition, y: center.y               })
            }
            if( isSideSafe.left ) {
              nodes.push({ x: center.x - maxPosition, y: center.y               })
            }

            /**
             * Nodes between center and sides:
             * 
             *  . x x . x x .
             *  x . . . . . x
             *  x . . . . . x
             *  . . . . . . .
             *  x . . . . . x
             *  x . . . . . x
             *  . x x . x x .
             */
            return Array.from(Array(row).keys())
              .reduce((nodes, empty, offset) => {
                
                /**
                 * I don't remembed anymore why I need offset + 1 then offset + 2, and I 
                 * hope nobody will ever ask me to explain that
                 */
                const position = nodeDistance * (offset + 1)
                const safePosition = (maxPosition - nodeDistance * (offset + 2)) < characterDimensions.x / 2
                const isPositionSafe = {
                  top         : isSideSafe.top         || safePosition,
                  bottom      : isSideSafe.bottom      || safePosition, 
                  right       : isSideSafe.right       || safePosition, 
                  left        : isSideSafe.left        || safePosition,
                  topLeft     : isSideSafe.topLeft     || safePosition,
                  topRight    : isSideSafe.topRight    || safePosition,
                  bottomLeft  : isSideSafe.bottomLeft  || safePosition, 
                  bottomRight : isSideSafe.bottomRight || safePosition,
                }

                if( isPositionSafe.top && isPositionSafe.topLeft && isSideSafe.left ) {
                  nodes.push({ x: center.x - maxPosition           , y: center.y + maxPosition - position })
                }
                if( isPositionSafe.left && isPositionSafe.topLeft && isSideSafe.top ) {
                  nodes.push({ x: center.x - maxPosition + position, y: center.y + maxPosition            })
                }
                if( isPositionSafe.top && isPositionSafe.topRight && isSideSafe.right ) {
                  nodes.push({ x: center.x + maxPosition           , y: center.y + maxPosition - position })
                }
                if( isPositionSafe.right && isPositionSafe.topRight && isSideSafe.top ) {
                  nodes.push({ x: center.x + maxPosition - position, y: center.y + maxPosition            })
                }
                if( isPositionSafe.bottom && isPositionSafe.bottomLeft && isSideSafe.left ) {
                  nodes.push({ x: center.x - maxPosition           , y: center.y - maxPosition + position })
                }
                if( isPositionSafe.left && isPositionSafe.bottomLeft && isSideSafe.bottom ) {
                  nodes.push({ x: center.x - maxPosition + position, y: center.y - maxPosition            })
                }
                if( isPositionSafe.bottom && isPositionSafe.bottomRight && isSideSafe.right ) {
                  nodes.push({ x: center.x + maxPosition           , y: center.y - maxPosition + position })
                }
                if( isPositionSafe.right && isPositionSafe.bottomRight && isSideSafe.bottom ) {
                  nodes.push({ x: center.x + maxPosition - position, y: center.y - maxPosition            })
                }

                return nodes
              }, nodes)
          }, [])
        )
      ], [])
      /**
       * Remove nodes if character can't be on them without collisions
       */
      .filter(node => (
        ! app.world.hasCollisions(
          new Box3().setFromCenterAndSize(
            new Vector3(node.x, node.y, characterDimensions.z / 2),
            new Vector3(characterDimensions.x, characterDimensions.y, characterDimensions.z),
          )
        )
      ))

    /**
     * Convert array to object, name of each node will be {x}|{y} 
     * Also prepare for A* by adding neigbours for each node
     */
    const map = nodes.reduce((nodes, node) => {
      nodes[`${node.x}|${node.y}`] = {
        key         : `${node.x}|${node.y}`,
        coordinates : node,
        neighbors   : {},
        owner       : false,
        distance    : false,
      }
      return nodes 
    }, {})
    
    for( const key in map ) {

      const node = map[ key ].coordinates
      const potentialNeighbors = [
        `${node.x + nodeDistance}|${node.y               }`,
        `${node.x + nodeDistance}|${node.y + nodeDistance}`,
        `${node.x + nodeDistance}|${node.y - nodeDistance}`,
        `${node.x               }|${node.y + nodeDistance}`,
        `${node.x               }|${node.y - nodeDistance}`,
        `${node.x - nodeDistance}|${node.y               }`,
        `${node.x - nodeDistance}|${node.y + nodeDistance}`,
        `${node.x - nodeDistance}|${node.y - nodeDistance}`,
      ]

      potentialNeighbors.forEach(
        neighborKey => {
          if( ! map[ neighborKey ] ) return;
          map[ key ].neighbors[ neighborKey ] = map[ neighborKey ] 
        }
      )
    }

    app.loading.set(`path-map: ${app.map.current.name}`, true)

    return map
  })
)

export { getPathMap }
