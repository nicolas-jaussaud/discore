/**
 * Fully remove an object from the scene, with all its childrens
 * @see https://stackoverflow.com/a/74474737/10491705 
 */
const remove = (app, object) => {

  if( object.children.length > 0 ) {
    for( let x = object.children.length - 1; x>=0; x-- ) {
      remove( app, object.children[x] )
    }
  }

  if( object.geometry ) object.geometry.dispose()

  if( object.material ) {
    if( object.material.length ) {
      for( let i = 0; i < object.material.length; ++i ) {

        if( object.material[i].map )         object.material[i].map.dispose()
        if( object.material[i].lightMap )    object.material[i].lightMap.dispose()
        if( object.material[i].bumpMap )     object.material[i].bumpMap.dispose()
        if( object.material[i].normalMap )   object.material[i].normalMap.dispose()
        if( object.material[i].specularMap ) object.material[i].specularMap.dispose()
        if( object.material[i].envMap )      object.material[i].envMap.dispose()

        object.material[i].dispose()
      }
    }
    else {
      if( object.material.map )         object.material.map.dispose()
      if( object.material.lightMap )    object.material.lightMap.dispose()
      if( object.material.bumpMap )     object.material.bumpMap.dispose()
      if( object.material.normalMap )   object.material.normalMap.dispose()
      if( object.material.specularMap ) object.material.specularMap.dispose()
      if( object.material.envMap )      object.material.envMap.dispose()

      object.material.dispose()
    }
  }

  object.removeFromParent()
  app.map.current.scene.remove(object)
  return true
}

export { remove }
