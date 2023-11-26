## Reference

### characters.actions

#### Overview

Each action will return a promise than will be resolved when the action is either finished or stopped.

- [character.actions.move](#character.actions.move)
- [character.actions.moveToSquare](#character.actions.movetosquare)
- [character.actions.wait](#character.actions.wait)

#### List

##### **character.actions.move**
- Type: _object_
- Description:

Move the character to specific coordinates. 

The action is triggered by using the `character.actions.move.start()` function:
```javascript
character.actions.move.start(x, y, z)
```

By default the character will run to the next position, but you can change this behavior with the 4th (optional) parameter:
```javascript
character.actions.move.start(x, y, z, 'walk')
```

The action can be interrupted at any moment by using `character.actions.move.stop()`:
```javascript
character.actions.move.stop()
```

##### **character.actions.moveToSquare**
- Type: _object_
- Description:

Works in a similar way than `character.actions.move`, except that we use a square key instead of coordinate:
```javascript
character.actions.moveToSquare.start('1|2')
```

By default, the character will move to the center of the square, but the postion can be changed with a second optional parameter, that will set the final position of the character (relative to the center of the square):
```javascript
character.actions.moveToSquare.start('1|2', { x: 100, y: -100 })
```

By default the character will run to the next position, but you can change this behavior with the third (optional) parameter:
```javascript
character.actions.moveToSquare.start('1|2', { x: 100, y: -100 }, 'walk')
```

The action can be interrupted at any moment by using `character.actions.moveToSquare.stop()`:
```javascript
character.actions.moveToSquare.stop()
```

##### **character.actions.wait**
- Type: _object_
- Description:

Wait for x amount of time while playing a defined animation:
```javascript
// No animation
character.actions.wait.start(1000)

// Idle animation
character.actions.wait.start(1000, 'idle')
```

The action can be interrupted at any moment by using `character.actions.wait.stop()`:
```javascript
character.actions.wait.stop()
```
