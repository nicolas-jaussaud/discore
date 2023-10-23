export default [
  // Go next to the sea
  character => character.actions.moveToSquare.start('0|-4', {}, 'walk'),
  character => character.actions.moveToSquare.start('1|-4', {}, 'walk'),
  character => character.actions.moveToSquare.start('1|-5', {}, 'walk'),
  character => character.actions.moveToSquare.start('1|-5', { x: +75 }, 'walk'),
  // Wait for 5 second
  character => character.actions.wait.start(5000, 'stretch'),
  // Go on the other side
  character => character.actions.moveToSquare.start('1|-5', {}, 'walk'),
  character => character.actions.moveToSquare.start('1|-6', {}, 'walk'),
  character => character.actions.moveToSquare.start('-1|-6', {}, 'walk'),
  character => character.actions.moveToSquare.start('-1|-5', {}, 'walk'),
  character => character.actions.moveToSquare.start('-1|-5', { x: -75 }, 'walk'),
  // Wait for 5 second
  character => character.actions.wait.start(5000, 'stretch'),
  // Go back to the initial position
  character => character.actions.moveToSquare.start('-1|-5', {}, 'walk'),
  character => character.actions.moveToSquare.start('-1|-4', {}, 'walk'),
  // Start again!
]
