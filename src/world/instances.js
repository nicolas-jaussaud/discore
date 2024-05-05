import { 
  InstancedMesh,
  Object3D
} from 'three'

const instance = app => ({
  loaded : {},
  reset  : () => app.world.instance.loaded = {},
  add    : (
    key,
    geometry,
    material,
    config
  ) => {
  
    if( ! app.world.instance.loaded[ key ] ) {
      app.world.instance.loaded[ key ] = { 
        geometry,
        material,
        instances: []
      }
    }
    
    app.world.instance.loaded[ key ].instances.push( config ) 
  },
  init  : scene => {

    app.world.instance.initAction = () => {
      for( const key in app.world.instance.loaded ) {
        app.world.instance.render(key, scene)
      }

      app.hooks.removeAction('loadComplete', app.world.instance.initAction)
    }

    app.hooks.addAction('loadComplete', app.world.instance.initAction)
  },
  render : (key, scene = false) => {

    const { 
      geometry,
      material,
      instances
    } = app.world.instance.loaded[ key ]

    const mesh = new InstancedMesh( geometry, material, instances.length )
    const dummy = new Object3D()

    for ( let i = 0; i < instances.length; i ++ ) {
      if( instances[i].before ) instances[i].before(mesh)
    }

    for ( let i = 0; i < instances.length; i ++ ) {

      const { 
        position, 
        rotation 
      } = instances[i]
      
      if( position ) dummy.position.set( position.x, position.y, position.z )
      if( rotation ) dummy.rotation.set( rotation.x, rotation.y, rotation.z )

      dummy.updateMatrix()
      mesh.setMatrixAt( i, dummy.matrix )
    } 

    scene.add( mesh )

    for ( let i = 0; i < instances.length; i ++ ) {
      if( instances[i].after ) instances[i].after(mesh)
    }
  }
})





export { instance }
