import { 
  PlaneGeometry, 
  MeshBasicMaterial,
  TextureLoader,
  Mesh 
} from 'three'

const renderWater = ({
  coordinates,
  app,
  scene
}) => {

  const geometry = new PlaneGeometry(app.map.squareSize, app.map.squareSize)
  const texture  = new TextureLoader().load(`./assets/ressources/world/water/water.jpg`)
  const material = new MeshBasicMaterial({ map: texture })
  const plane    = new Mesh(geometry, material)

  plane.position.set(
    coordinates.x[1] - app.map.squareSize / 2, 
    coordinates.y[1] - app.map.squareSize / 2,
    0
  )
  
  scene.add(plane)
}

export { renderWater }
