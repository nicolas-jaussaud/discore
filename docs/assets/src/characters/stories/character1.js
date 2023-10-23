export default [
  // River -> Central path -> Side of the bridge
  character => character.actions.moveToSquare.start('0|-4', {}, 'walk'),
  character => character.actions.moveToSquare.start('0|-2', {}, 'walk'),
  character => character.actions.moveToSquare.start('0|-2', { x: -50 }, 'walk'),
  // Wait for 5 second
  character => character.actions.wait.start(5000, 'stretch'),
  // Side of the bridge -> Top of path -> River
  character => character.actions.moveToSquare.start('0|-2', {}, 'walk'),
  character => character.actions.moveToSquare.start('0|0', {}, 'walk'),
  character => character.actions.moveToSquare.start('-2|0', { x: -50 }, 'walk'),
  character => character.actions.moveToSquare.start('-2|0', { x: -50, y: -50 }, 'walk'),
  // Wait for 5 second
  character => character.actions.wait.start(5000, 'stretch'),
  // River -> Top of the path -> Side of the bridge
  character => character.actions.moveToSquare.start('-2|0', { y: -50 }, 'walk'),
  character => character.actions.moveToSquare.start('0|0', { y: -50 }, 'walk'),
  character => character.actions.moveToSquare.start('0|-2', {}, 'walk'),
  character => character.actions.moveToSquare.start('0|-2', { x: 50 }, 'walk'),
  // Wait for 5 second
  character => character.actions.wait.start(5000, 'stretch'),
  // Side of the bridge -> Bottom of the path -> River
  character => character.actions.moveToSquare.start('0|-2', {}, 'walk'),
  character => character.actions.moveToSquare.start('0|-4', {}, 'walk'),
  character => character.actions.moveToSquare.start('2|-4', {}, 'walk'),
  character => character.actions.moveToSquare.start('2|-4', { y: +50 }, 'walk'),
  // Wait for 5 second
  character => character.actions.wait.start(5000, 'stretch'),
  // Start again!
]
