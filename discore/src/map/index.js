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
  
  app.map = {
    ...app.map,
    current: map,
    getByCoordinates: coordinates => getByCoordinates(app, coordinates)
  }
}

const registerSquareType = (app, type, square) => {
  app.map.squareTypes[ type ] = square
}

/**
 * I don't like that, but it'll do for now
 */
const getByCoordinates = (app, coordinates) => {
  for( let i = 0; i < app.map.current.length; i++ ) {
    const square = app.map.current[i].coordinates
    if(  
         coordinates.x >= square.x[0] 
      && coordinates.x <= square.x[1]
      && coordinates.y >= square.y[0]
      && coordinates.y <= square.y[1]
    ) {
      return app.map.current[i]
    }
  }
  return false
}

export default {
  load: load,
  registerSquareType: registerSquareType
}
