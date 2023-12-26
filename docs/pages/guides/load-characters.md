## Guides

### Load characters

- [Import 3D assets](#import-3d-assets)
- [Define character attributes](#define-character-attributes)
- [Import callback](#import-callback)
- [Set main character](#set-main-character)

#### Import 3D assets

To add a new character into your discore app, you need to load:
- The 3D file of your character (the supported format are FBX and OBJ/MTL)
- The associated animations. You can add as many animations as you want, but the following ones are required:
  - idle 
  - run
  - walk

A good place to get animations (and/or a 3D file for your characters) would be [mixamo](https://www.mixamo.com/).

Here is a minimal example of how you can load a character into your discore app (regardless of if it's the main character or not):
```javascript
app.characters.add({
  name       : 'character-name',
  file       : './ressources/character/object.fbx',
  animations : {
    run   : './ressources/character/animations/run.fbx', 
    idle  : './ressources/character/animations/idle.fbx',
    walk  : './ressources/character/animations/walk.fbx',
    // ...
  }
})
```

#### Define character attributes

The only attribute needed by discore is `speed` (both for walking and running). It's not required to set it as a default value will be used if not specified.

The `attributes` object can also be used to define any custom attribute needed by your app, as you can easily access them afterward.

Here is how attributes are defined:
```javascript
app.characters.add({
    // ...
    attributes : {
      custom : 'custom value',
      speed  : {
        run   : 0.5,
        walk  : 0.1,
      },
    }
  }
})
```

#### Import callback

The `app.characters.add()` function accepts a callback as a second parameter. It will be used when all the files have been loaded and the character is ready to be added to a map.

The callback will return one parameter (the `character` object). There is more information about how to interact with the character object in the [associated reference page](./pages/reference/character.md).

Here is an example of how to use it:
```javascript
app.characters.add({
  // ...character config
}, character => {
  app.map.current.scene.add(character.object)
  app.map.moveCharacterOnSquare('0|-1', character)
})
```

#### Set main character

To define a character as the main character, the following function can be used:
```javascript
app.characters.setMain('character-name')
```

The `app.characters.setMain()` function has to be called after the associated character is fully loaded, and will typically be used in the callback:
```javascript
app.characters.add({
  // ...character config
}, character => app.characters.setMain(character.name))
```
