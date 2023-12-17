/**
 * Simple cache to avoid regenerating existing materials as it impacts performances pretty badly 
 */
const materials = app => ({
  loaded : {},
  get    : (key, callback) => {

    if( app.world.materials.loaded[ key ] ) {
      return app.world.materials.loaded[ key ]
    }
  
    app.world.materials.loaded[ key ] = callback(key)
    return app.world.materials.loaded[ key ]
  }
})

export { materials }
