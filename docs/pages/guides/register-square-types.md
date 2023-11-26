## Guides

### Register square types

- [Usage](#usage)
- [Registration](#registration)
- [Example](#example)

#### Usage

Discore maps are composed of squares. 

Each square has a type associated, that will be used by discore to know
how to render the square and its properties (for example, as square type could be "grass" or "water").

We can't generate a map without registering all the associated square types first.

#### Registration

To register a square, the `app.map.registerSquareType` function is used.
```javascript
app.map.registerSquareType('square-type-name', {
  walkable : true,
  render   : renderSquareFunction
})
```

The first parameter will be the square type, and the second the associated properties:

- `walkable` is used to check if characters are allowed to move on the squares generated from this square type 
- `render` is the function that will be used to render the squares that will use this types. The function take an object as a parameter with the following attribtues:
  - **scene** - The current [THREE.scene](https://threejs.org/docs/#api/en/scenes/Scene) object where the square needs to be generated
  - **coordinates** - The coordinate where the square needs to be generated
  - **app** - The current discore [app](./pages/reference/app.md)
  - **config** - Any additional config passed when defining the square in the map

#### Example

Here is an example of square type (from the [quick start example](./pages/examples/quick-start.md)). 

The square type generate a [THREE.PlaneGeometry](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) with a different color accoding to the config:

```javascript
app.map.registerSquareType('colored-plane', {
  walkable : true,
  render   : ({ scene, coordinates, app, config }) => {
  
    const { THREE } = discore

    const geometry = new THREE.PlaneGeometry(
      app.map.squareSize, 
      app.map.squareSize
    )
  
    const material = new THREE.MeshBasicMaterial({ 
      color: config.color,
      side: THREE.DoubleSide 
    })
    
    const plane = new THREE.Mesh(geometry, material)
    
    plane.position.set(
      coordinates.x[1] - app.map.squareSize / 2, 
      coordinates.y[1] - app.map.squareSize / 2,
      0
    )

    scene.add(plane)
  }
})
```
