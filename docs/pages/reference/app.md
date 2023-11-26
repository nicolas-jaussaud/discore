## Reference

### app

#### Overview

The `app` object is returned on the discore app initialization. To learn more about this, see the [app creation guide](./pages/guides/create-app.md).

- [app.camera](#app.camera)
- [app.characters](#app.characters)
- [app.clock](#app.clock)
- [app.hooks](#app.hooks)
- [app.lights](#app.lights)
- [app.map](#app.map)
- [app.renderer](#app.renderer)
- [app.start](#app.start)
- [app.status](#app.status)
- [app.stop](#app.stop)
- [app.view](#app.view)
- [app.world](#app.world)

#### List

##### **app.camera** 
- Type: _[THREE.OrthographicCamera](https://threejs.org/docs/index.html#api/en/cameras/OrthographicCamera)_

##### **app.characters** 
- Type: _object_
- Description: 

See [app.characters reference](./pages/reference/app.characters).

##### **app.clock** 
- Type: _[THREE.Clock](https://threejs.org/docs/index.html#api/en/core/Clock)_

##### **app.hooks** 
- Type: _object_
- Description: 

Object used to interact with the hooks system, and create/listen to the app [filters](./pages/hooks/filters.md) and [actions](./pages/hooks/actions.md). More information about the `app.hooks` object are available on the [hooks reference page](./pages/reference/app.hooks.md).

##### **app.lights** 
- Type: _array_
- Description:

Array of lights that will be used for the current scene. It will be empty by default, but you can add any light to the scene.

Here is and example with a [THREE.HemisphereLight](https://threejs.org/docs/index.html#api/en/lights/HemisphereLight):

```js
const { THREE } = discore

const light = new THREE.HemisphereLight(0x9999FF, 0x88ffFF, 0.7)
app.lights.push(light)
```

##### **app.map** 
- Type: _object_
- Description:

Object used  to interact and load maps. See [app.map reference](./pages/reference/app.map.md).

##### **app.renderer** 
- Type: _[THREE.WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)_

##### **app.start** 
- Type: _function_

##### **app.status** 
- Type: _string_
- Description:

Current status of the app, can either be `started` or `paused`. Status can be changed by using `app.start()` and `app.stop()`.

##### **app.stop** 
- Type: _function_

##### **app.view** 
- Type: _object_
- Description:

The view object handle the angle of the camera. There are 2 possible angle: `orthographic` or `top`.

By default, the angle used will be `orthographic` but it can be changed at any time by using the following code:
```js
app.view.set('top')
``` 

##### **app.world** 
- Type: _object_
- Description:

Object used interact with the app world (used to evaluate collisions and import objects). More information about the `app.world` object are available on the [associated reference page](./pages/reference/app.world.md).
