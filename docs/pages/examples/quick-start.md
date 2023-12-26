## Examples

### Quick start

<iframe 
  height="600"
  style="width: 100%;" 
  scrolling="no" 
  title="Discourse - Quick start" 
  src="./examples/quick-start.html" 
  loading="lazy"
></iframe>

```js
const { THREE } = discore

// Register app

const app = discore.init({
  element: document.getElementById('app')
})

// Register configurable squares for our map (in this example, the color is configurable)

app.map.registerSquareType('colored-plane', {
  walkable : true,
  render   : ({ scene, coordinates, app, config }) => {
  
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

// Create map (Will only be loaded after main character is loaded)

const map = {
  '1|-1'  : { type: 'colored-plane', config: { color: 0x333333 } },
  '0|1'   : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '1|1'   : { type: 'colored-plane', config: { color: 0x333333 } },
  '1|0'   : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '0|0'   : { type: 'colored-plane', config: { color: 0x333333 } },
  '-1|0'  : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '-1|-1' : { type: 'colored-plane', config: { color: 0x333333 } },
  '0|-1'  : { type: 'colored-plane', config: { color: 0xAAAAAA } },
  '-1|1'  : { type: 'colored-plane', config: { color: 0x333333 } },
}

const folder = './ressources/characters/'
app.characters.add({
  name       : 'main-character-name',
  file       : folder + 'peasant.fbx',
  animations : {
    run     : folder + 'animations/run.fbx', 
    idle    : folder + 'animations/idle.fbx',
    walk    : folder + 'animations/walk.fbx'
  }
}, character => {
  
  character.object.scale.set(0.5, 0.5, 0.5)
  character.object.rotation.x = Math.PI / 2
  
  app.characters.setMain('main-character-name')
  app.map.load('map-name', map, '0|0')
  app.map.current.scene.background = new THREE.Color( 0x111155 )
})

const sideLight = new THREE.DirectionalLight('rgb(200, 230, 255)', 0.3)
const hemiLight = new THREE.HemisphereLight(0x9999FF, 0x88ffFF, 0.7)

sideLight.position.set(7000000, -10000000, 10000000)
sideLight.rotation.x = 0

// Lights must be pushed into app.lights, so that they are re-created each time we change the current map 

app.lights.push(hemiLight)
app.lights.push(sideLight)
```
