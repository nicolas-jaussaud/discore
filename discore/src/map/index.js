const load = (app, map) => {
  map.forEach(square => {

    const squareType = app.map.squareTypes[ square.type ]
    const coordinates = square.coordinates

    squareType.render({
      coordinates: coordinates,
      app: app, 
      config: square.config ?? {}
    })
  })  
}

const registerSquareType = (app, type, square) => {
  app.map.squareTypes[ type ] = square
}

export default {
  load: load,
  registerSquareType: registerSquareType
}
