## Reference

### characters

#### Overview

The `character` object is returned when importing a new character into a discore app. To learn more about this, see the [load character guide](./pages/guides/load-characters.md).

- [character.actions](#character.actions)
- [character.attributes](#character.attributes)
- [character.object](#character.object)
- [character.name](#character.name)
- [character.startAnimation](#character.startAnimation)
- [character.stopAnimation](#character.stopAnimation)

#### List

##### **character.actions**
- Type: _object_
- Description:

See [character.actions reference](./pages/reference/character.actions.md).

##### **character.attributes** 
- Type: _object_

##### **character.object** 
- Type: _THREE.Object3D_

##### **character.name** 
- Type: _string_

##### **character.startAnimation** 
- Type: _function_

##### **character.stopAnimation** 
- Type: _function_
- Description:

Both `character.startAnimation()` and `character.stopAnimation()` are used to interact with the animations initially loaded in the `app.characters.add()`:

```javascript
character.startAnimation('sit')
setTimeout(() => character.stopAnimation('sit'), 5000)
```



