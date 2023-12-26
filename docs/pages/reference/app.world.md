## Reference

### app.world

#### Overview

More information about how to use `app.world` in the [import objects guide](./pages/guides/import-objects.md).

- [app.world.add](#app.world.add)
- [app.world.hasCollisions](#app.world.hascollisions)
- [app.world.cache](#app.world.cache)

#### List

##### **app.world.add** 
- Type: _function_ 

##### **app.world.hasCollisions** 
- Type: _function_ 

##### **app.world.cache** 
- Type: _object_ 

`app.world.cache` is used to easily store the data associated to a given callback.

Here is an example that will cache a material:
```javascript
const plane = app.world.cache.get(
  'material-name', // Must be unique, will be returned as an argument of the callback
  key => {

    const { THREE } = discore

    const texture = new THREE.TextureLoader().load('url/to/texture.png')
    return new THREE.MeshBasicMaterial({ map: texture })
  }
)
```
