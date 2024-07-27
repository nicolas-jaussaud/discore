/**
 * Simple cache to avoid regenerating existing elements
 */
const cache = app => ({
  loaded : {},
  delete : key => delete app.world.cache.loaded[ key ],
  get    : (key, callback) => {

    if( app.world.cache.loaded[ key ] ) {
      return app.world.cache.loaded[ key ]
    }

    app.world.cache.loaded[ key ] = callback(key)
    return app.world.cache.loaded[ key ]
  }
})

export { cache }
