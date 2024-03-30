## Hooks

### Actions

More information about how to interact with actions in the [app.hooks reference page](./pages/reference/app.hooks.md).

#### Overview

- [afterRender](#afterRender)
- [beforeRender](#beforerender)
- [characterMoved](#charactermoved)
- [clickOnCharacter](#clickoncharacter)
- [loadComplete](#loadcomplete)
- [mouseEnterCharacter](#mouseentercharacter)
- [mouseOnCharacter](#mouseoncharacter)
- [mouseLeaveCharacter](#mouseleavecharacter)
- [mapLoaded](#maploaded)

#### List

##### **afterRender**

Called after rendering each frame:
```javascript
app.hooks.addAction('afterRender', () => {
  // ...
})
```

##### **beforeRender**

Called before rendering each frame:
```javascript
app.hooks.addAction('beforeRender', () => {
  // ...
})
```

##### **characterMoved**
Called each time a character move, pass [character object](./pages/reference/character.md) as parameter:
```javascript
app.hooks.addAction('characterMoved', ({ character }) => {
  // ...
})
```

##### **clickOnCharacter**
Called each time the user click on a character, pass [character object](./pages/reference/character.md) as parameter:
```javascript
app.hooks.addAction('clickOnCharacter', ({ character }) => {
  // ...
})
```

##### **loadComplete**
Called when all the objects we rely on for the current map have been fetched and imported to the scene:
```javascript
app.hooks.addAction('loadComplete', () => {
  // ...
})
```

##### **mouseEnterCharacter**
Called when the mouse is on the character (won't be called again until the mouse leaves the current character), pass [character object](./pages/reference/character.md) as parameter:
```javascript
app.hooks.addAction('mouseEnterCharacter', ({ character }) => {
  // ...
})
```

##### **mouseOnCharacter**
Called on each render when the mouse is on a character, pass [character object](./pages/reference/character.md) as parameter:
```javascript
app.hooks.addAction('mouseOnCharacter', ({ character }) => {
  // ...
})
```

##### **mouseLeaveCharacter**
Called when the mouse is not on a character anymore, pass [character object](./pages/reference/character.md) as parameter:
```javascript
app.hooks.addAction('mouseLeaveCharacter', ({ character }) => {
  // ...
})
```

##### **mapLoaded**
Called each time a new map is loaded, pass map name and map object as parameters:
```javascript
app.hooks.addAction('mapLoaded', ({ mapName, map }) => {
  // ...
})
```
