## Guides

### Import objects

- [Import](#import)
- [Disable collisions](#disable-collisions)
- [Evaluate collisions](#evaluate-collisions)

#### Import

To import objects into the current discore app, `app.world.add` needs to be used (the supported format are FBX and OBJ/MTL):
```javascript
app.world.add(`./ressources/character/object.fbx`)
```

The imported objects won't be automatically added to the current scene, but it can be added by using the third parameter of `app.world.add`, which is a callback that will be called when the object is fully loaded:
```javascript
app.world.add(`./ressources/character/object.fbx`, {}, object => scene.add(object))
```

The object returned by the callback is a [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D) instance.

#### Disable collisions

By default, any loaded object will have collisions enabled with the loaded characters.

You can exclude an object from being evaluated for potential conflicts by setting the `walkable` attribute to `true`:
```javascript
app.world.add(
  `./ressources/character/object.fbx`, 
  { walkable: true }, 
  object => scene.add(object)
)    
```

### Evaluate collisions

It's possible to evaluate potential collision with the `app.world.hasCollisions` function:
```javascript
app.world.hasCollisions(item)
```

The passed parameter can either be an instance of [THREE.Object3D](https://threejs.org/docs/#api/en/core/Object3D) or [THREE.Vector3](https://threejs.org/docs/#api/en/math/Vector3).
