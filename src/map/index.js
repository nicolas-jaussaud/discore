import { createMap } from './create'
import {
  moveCharacterOnSquare,
  getCoordinateBySquare,
  registerSquareType,
  getSquareType,
  getSquareByCoordinates
} from './helpers'

const load = (app, name, squares, initialSquare) => {

  const character = app.characters.getMain()
  app.loading.set('map', false)
  
  if( app.map.current ) {
    app.map.current.unload()
  }

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
    app.map.maps[name].load()
    app.map.current = app.map.maps[name]
    isLoaded()
    return; 
  }
  
  const map = createMap(app, squares)
  map.load()
  
  app.map = {
    ...app.map,
    current: map,
    maps: {
      ...app.map.maps,
      [name]: map
    },
    getSquareByCoordinates: coordinates => getSquareByCoordinates(app, coordinates),
    getSquareType: type => getSquareType(app, type)
  }
  
  isLoaded()
}

const init = (app, squareSize) => ({
  maps                  : {},
  current               : false,
  squareTypes           : [],
  squareSize            : squareSize,
  load                  : (name, map, initialSquare) => load(app, name, map, initialSquare),
  registerSquareType    : (type, square) => registerSquareType(app, type, square),
  moveCharacterOnSquare : (key, character) => moveCharacterOnSquare(app, key, character),
  getCoordinateBySquare : key => getCoordinateBySquare(app, key)
})

export { init }
