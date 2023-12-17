import { Scene } from 'three'

const createMap = (app, squares) => {

  const map = {
    scene   : false,
    squares : squares,
    objects : []
  }

  map.load = () => {
    map.scene = new Scene()
    map.scene.add(app.camera)
    map.scene.add(app.characters.getMain().object)
    app.lights.map(light => map.scene.add(light))
    map.generateSquares()
  }

  map.unload = () => {
    while( map.scene.children.length > 0 ) {
      map.scene.remove(map.scene.children[0]) 
    }
    map.scene = false
  }
  
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

export { createMap }
