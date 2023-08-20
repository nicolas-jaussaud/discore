const load = (app, map) => {
  for( const key in map ) {

    const coordinates = key.split('|')
    const squareType = app.map.squareTypes[ map[key].type ]
    const squareSize = app.map.squareSize    

    squareType.render({
      coordinates: {
        x: [
          parseInt(coordinates[0]) * squareSize - (squareSize / 2), 
          parseInt(coordinates[0]) * squareSize + (squareSize / 2)
        ],
        y: [
          parseInt(coordinates[1]) * squareSize - (squareSize / 2), 
          parseInt(coordinates[1]) * squareSize + (squareSize / 2)
        ]
      },
      app: app,
      config: map[key].config ?? {},
    })
  }

  app.map = {
    ...app.map,
    current: map,
    getSquareByCoordinates: coordinates => getSquareByCoordinates(app, coordinates),
    getSquareType: type => getSquareType(app, type)
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

  return app.map.current[`${lowX}|${lowY}`] ?? false
}

export default {
  load: load,
  registerSquareType: registerSquareType
}
