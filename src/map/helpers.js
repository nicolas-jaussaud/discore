const getSquare = (app, key) => {
  return app.map.current.squares[ key ] ?? false
}

const moveCharacterOnSquare = (app, key, character) => {
  const coordinates = getCoordinateBySquare(app, key)  
  character.object.position.set(
    coordinates.x, 
    coordinates.y,
    character.object.position.z
  )
}

const getCoordinateBySquare = (app, key) => {
  const coordinates = key.split('|')
  return {
    x: coordinates[0] * app.map.squareSize, 
    y: coordinates[1] * app.map.squareSize,
  }
}

const registerSquareType = (app, type, square) => {
  app.map.squareTypes[ type ] = square
}

const getSquareType = (app, type) => (
  app.map.squareTypes[ type ] ?? false
)

const getSquareByCoordinates = (app, coordinates, type = 'object') => {

  const squareSize = app.map.squareSize
  const halfSize = squareSize / 2
  
  const lowY = Math.floor( (coordinates.y + halfSize) / squareSize )
  const lowX = Math.floor( (coordinates.x + halfSize) / squareSize )

  return type === 'object'
    ? app.map.getSquare(`${lowX}|${lowY}`)
    : `${lowX}|${lowY}`
}

const isSquareWalkable = (app, key) => {

  const square = app.map.getSquare(key)
  const type = app.map.getSquareType(square.type ?? '')

  if( square === false || type === false ) {
    return false;
  } 

  return type.walkable === true
}

const isNeighborsWalkable = (app, coordinates, position) => {
  switch(position) {
    case 'top':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x,
          y: coordinates.y + app.map.squareSize
        }, 'key').key ?? false
      )
    case 'bottom':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x,
          y: coordinates.y - app.map.squareSize
        }, 'key').key ?? false
      )
    case 'right':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x + app.map.squareSize,
          y: coordinates.y
        }, 'key').key ?? false
      )
    case 'left':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x - app.map.squareSize,
          y: coordinates.y
        }, 'key').key ?? false
      )
    case 'top-left':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x - app.map.squareSize,
          y: coordinates.y + app.map.squareSize
        }, 'key').key ?? false
      )
    case 'bottom-left':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x - app.map.squareSize,
          y: coordinates.y - app.map.squareSize
        }, 'key').key ?? false
      )
    case 'top-right':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x + app.map.squareSize,
          y: coordinates.y + app.map.squareSize
        }, 'key').key ?? false
      )
    case 'bottom-right':
      return app.map.isSquareWalkable(
        app.map.getSquareByCoordinates({
          x: coordinates.x + app.map.squareSize,
          y: coordinates.y - app.map.squareSize
        }, 'key').key ?? false
      )
  }
}

export {
  getSquare,
  moveCharacterOnSquare,
  getCoordinateBySquare,
  registerSquareType,
  getSquareType,
  getSquareByCoordinates,
  isSquareWalkable,
  isNeighborsWalkable
}
