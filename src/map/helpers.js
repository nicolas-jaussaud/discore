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

const getSquareByCoordinates = (app, coordinates) => {

  const squareSize = app.map.squareSize
  const halfSize = squareSize / 2
  
  const lowY = Math.floor( (coordinates.y + halfSize) / squareSize )
  const lowX = Math.floor( (coordinates.x + halfSize) / squareSize )

  return app.map.current.squares[`${lowX}|${lowY}`] ?? false
}

export {
  moveCharacterOnSquare,
  getCoordinateBySquare,
  registerSquareType,
  getSquareType,
  getSquareByCoordinates
}
