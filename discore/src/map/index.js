import { Scene } from 'three'

const load = (app, name, squares, initialSquare) => {

  if( app.controls.actions.currentAction ) {
    app.controls.actions.currentAction = false
  }

  if( app.map.maps[name] ) {
    app.map.current = app.map.maps[name]
    app.map.current.scene.add(app.characters.main.object)
    app.map.moveCharacterOnSquare(initialSquare)
    return; 
  }

  const map = {
    scene: new Scene(),
    squares: squares,
    objects: []
  }

  map.scene.add(app.camera)
  map.scene.add(app.characters.main.object)

  app.lights.map(light => map.scene.add(light))
  
  for( const key in squares ) {

    const coordinates = key.split('|')
    const squareType = app.map.squareTypes[ squares[key].type ]
    const squareSize = app.map.squareSize    

    squareType.render({
      scene: map.scene,
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
      config: squares[key].config ?? {},
      key: key
    })

    map.squares[key].key = key
  }

  app.map = {
    ...app.map,
    current: map,
    maps: {
      ...app.maps,
      [name]: map
    },
    getSquareByCoordinates: coordinates => getSquareByCoordinates(app, coordinates),
    getSquareType: type => getSquareType(app, type)
  }

  app.map.moveCharacterOnSquare(initialSquare)
}

const moveCharacterOnSquare = (app, key) => {

  const coordinates = key.split('|')  

  app.characters.main.object.position.set(
    coordinates[0] * app.map.squareSize, 
    coordinates[1] * app.map.squareSize,
    app.characters.main.object.position.z
  )
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

const init = (app, squareSize) => ({
  maps: {},
  current: false,
  squareTypes: [],
  squareSize: squareSize,
  load: (name, map, initialSquare) => load(app, name, map, initialSquare),
  registerSquareType: (type, square) => registerSquareType(app, type, square),
  moveCharacterOnSquare: key => moveCharacterOnSquare(app, key) 
})

export { init }
