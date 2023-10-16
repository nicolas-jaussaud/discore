export default (app, character) => ([
  // Go on next to the sea
  () => {
    const coordinates = app.map.getCoordinateBySquare('0|-4')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('1|-4')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('1|-5')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('1|-5')
    return character.actions.move.start(coordinates.x + 75, coordinates.y, 0, 'walk')
  },
  // Wait for 10 second
  () => {
    character.startAnimation('stretch')
    return new Promise(resolve => setTimeout(() => {
      character.stopAnimation('stretch')
      resolve()
    }, 10000))
  },
  // Go on the other side
  () => {
    const coordinates = app.map.getCoordinateBySquare('1|-5')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('1|-6')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('-1|-6')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('-1|-5')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('-1|-5')
    return character.actions.move.start(coordinates.x - 75, coordinates.y, 0, 'walk')
  },
  // Wait for 10 second
  () => {
    character.startAnimation('stretch')
    return new Promise(resolve => setTimeout(() => {
      character.stopAnimation('stretch')
      resolve()
    }, 10000))
  },
  // Go back to initial position
  () => {
    const coordinates = app.map.getCoordinateBySquare('-1|-5')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  () => {
    const coordinates = app.map.getCoordinateBySquare('-1|-4')
    return character.actions.move.start(coordinates.x, coordinates.y, 0, 'walk')
  },
  // Start again!
])
