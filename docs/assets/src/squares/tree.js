import { renderGrass } from './grass'

const renderTree = ({
  coordinates,
  app,
  config
}) => {

  renderGrass({coordinates, app})
  
  app.world.add(
    `./assets/ressources/world/tree/forest${config.type ?? 1}.fbx`,
    { walkable: false },
    tree => {

      tree.position.set(
        coordinates.x[1] - app.map.squareSize / 2, 
        coordinates.y[1] - app.map.squareSize / 2,
        -10
      )
      
      tree.scale.set( 0.2, 0.2, 0.2 )
      tree.rotation.x = Math.PI / 2
    
      app.scene.add(tree)
    }
  )
}

export { renderTree }
