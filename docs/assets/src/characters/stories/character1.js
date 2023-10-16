export default (app, character) => ([
  // Leave from the river to the path
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-4')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Leave from the bottom of the map to the bridge
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-2')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Go on the right side of the bridge
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-2')
    return character.actions.move.start(coordinates.x - 50, coordinates.y, 0, 'walk')
  },
  // Wait for 10 second
  () => {
    character.startAnimation('stretch')
    return new Promise(resolve => setTimeout(() => {
      character.stopAnimation('stretch')
      resolve()
    }, 10000))
  },
  // Go back on center of the path
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-2')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Leave from the bridge to the top of the map
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|0')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Leave from the top to the top right
  () => {
    const coordinates = app.map.getCoordinateBySquare('-2|0')
    return character.actions.move.start(coordinates.x - 50, coordinates.y, 0, 'walk')
  },
  // Go on next to the river
  () => {
    const coordinates = app.map.getCoordinateBySquare('-2|0')
    return character.actions.move.start(coordinates.x - 50, coordinates.y - 50, 0, 'walk')
  },
  // Wait for 10 second
  () => {
    character.startAnimation('stretch')
    return new Promise(resolve => setTimeout(() => {
      character.stopAnimation('stretch')
      resolve()
    }, 10000))
  },
  // Go back on center of the path
  () => {
    const coordinates = app.map.getCoordinateBySquare('-2|0')
    return character.actions.move.start(coordinates.x, coordinates.y -50, 0, 'walk')
  },
  // Leave from the top right to the top center
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|0')
    return character.actions.move.start(coordinates.x, coordinates.y -50, 0, 'walk')
  },
  // Leave from the top of the map to the bridge
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-2')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Go on the right side of the bridge
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-2')
    return character.actions.move.start(coordinates.x + 50, coordinates.y, 0, 'walk')
  },
  // Wait for 10 second
  () => {
    character.startAnimation('stretch')
    return new Promise(resolve => setTimeout(() => {
      character.stopAnimation('stretch')
      resolve()
    }, 10000))
  },
  // Go back on center of the path
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-2')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Leave from the bridge to the bottom of the map
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-4')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Leave to the bottom right
  () => {
    const coordinates = app.map.getCoordinateBySquare('2|-4')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Go on the right side of the bridge
  () => {
    const coordinates = app.map.getCoordinateBySquare('2|-4')
    return character.actions.move.start(coordinates.x, coordinates.y + 50, 0, 'walk')
  },
  // Wait for 10 second
  () => {
    character.startAnimation('stretch')
    return new Promise(resolve => setTimeout(() => {
      character.stopAnimation('stretch')
      resolve()
    }, 10000))
  }
  // Start again!
])
