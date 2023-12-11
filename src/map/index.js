import { Scene } from 'three'

const load = (app, name, squares, initialSquare) => {

  const character = app.characters.getMain()
  app.loading.set('map', false)

  if( character.actions.currentAction ) {
    character.actions.currentAction = false
  }

  const isLoaded = () => {
    app.map.moveCharacterOnSquare(initialSquare, character)
    app.hooks.doAction('mapLoaded', { 
      name : name, 
      map  : app.map.maps[name] 
    })
    app.loading.set('map', true)
  }
  
  if( app.map.maps[name] ) {
    app.map.current = app.map.maps[name]
    app.map.current.scene.add(character.object)
    isLoaded()
    return; 
  }

  const map = {
    scene: new Scene(),
    squares: squares,
    objects: []
  }

  map.scene.add(app.camera)
  map.scene.add(character.object)

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

  isLoaded()
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
  moveCharacterOnSquare: (key, character) => moveCharacterOnSquare(app, key, character),
  getCoordinateBySquare: key => getCoordinateBySquare(app, key)
})

export { init }
