import { createMap } from './create'
import { searchPath } from './path/'
import {
  getSquare,
  moveCharacterOnSquare,
  getCoordinateBySquare,
  registerSquareType,
  getSquareType,
  getSquareByCoordinates,
  isSquareWalkable,
  isNeighborsWalkable
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

  const isLoaded = async () => {

    /**
     * We need to wait for all objects to be loaded before being able to
     * generate an accurate path map
     */
    await Promise.all(app.world.promises)

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

  const map = createMap(app, name, squares)
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
  getSquare             : key => getSquare(app, key),
  registerSquareType    : (type, square) => registerSquareType(app, type, square),
  moveCharacterOnSquare : (key, character) => moveCharacterOnSquare(app, key, character),
  getCoordinateBySquare : key => getCoordinateBySquare(app, key),
  isSquareWalkable      : key => isSquareWalkable(app, key),
  isNeighborsWalkable   : (key, position) => isNeighborsWalkable(app, key, position),
  searchPath            : (currentPosition, targetPosition) => searchPath(app, currentPosition, targetPosition)
})

export { init }
