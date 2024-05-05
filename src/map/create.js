import { Scene } from 'three'

const createMap = (app, name, squares) => {

  const map = {
    name    : name,
    scene   : false,
    squares : squares
  }

  map.load = () => {
    map.scene = new Scene()
    map.scene.add(app.camera)
    map.scene.add(app.characters.getMain().object)
    app.lights.map(light => map.scene.add(light))
    map.objects = []
    app.world.instance.init(map.scene)
    map.generateSquares()
  }

  map.unload = () => unloadMap(app, map)
  
  map.generateSquares = () => {
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
        key: key,
      })

      map.squares[key].key = key
    }
  }

  return map
}

const unloadMap = (app, map) => {

  map.objects.forEach(object => app.world.remove(object))
  
  const characters = app.characters.getAll()
  for( const name in characters ) {

    const character = characters[ name ]

    if( character.name !== app.characters.getMain().name ) {
      app.world.remove(character.object)
    }
  }

  delete map.objects
  map.scene = false   
  app.world.instance.reset()
}

export { createMap }
