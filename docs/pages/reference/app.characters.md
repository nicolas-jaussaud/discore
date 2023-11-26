## Reference

### app.characters

#### Overview

- [app.characters.add](#app.characters.add)
- [app.characters.get](#app.characters.get)
- [app.characters.getAll](#app.characters.getAll)
- [app.characters.getMain](#app.characters.getMain)
- [app.characters.setMain](#app.characters.setMain)

#### List

##### **app.characters.add** 
- Type: _function_ 
- Description:

Used to import new character. See [associated guide](./pages/guides/load-characters.md) for more information about it.
```javascript
app.characters.add({
  name       : 'character-name',
  file       : './ressources/character/object.fbx',
  animations : {
    run   : './ressources/character/animations/run.fbx', 
    idle  : './ressources/character/animations/idle.fbx',
    walk  : './ressources/character/animations/walk.fbx',
  }
  attributes : {}
}, callback)
```

##### **app.characters.get** 
- Type: _function_
- Description:

Used to get any imported character by name:
```javascript
app.characters.get('character-name')
```

##### **app.characters.getAll** 
- Type: _function_
- Description:

Return an object with all the registered characters (regardless of if they are on the current map). 
```javascript
app.characters.getAll()
```

##### **app.characters.getMain** 
- Type: _function_
- Description:

Return the main character (of false if not defined). 
```javascript
app.characters.getMain()
```

##### **app.characters.setMain** 
- Type: _function_
- Description:

Used to set the main character. 
```javascript
app.characters.setMain('character-name')
```
