import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js'

import { fbx, obj, mtl, ktx2 } from './loaders'
import { init as initManager } from './manager'

const init = app => {

  const manager = initManager(app)
  
  const loaders =  {
    fbx   : new FBXLoader(manager),
    mtl   : new MTLLoader(manager),
    obj   : new OBJLoader(manager),
    ktx2  : new KTX2Loader(manager),
    debug : app.environment === 'development',
    load  : (name, callback = false) => load(app, name, callback)
  }

  // @see https://threejs.org/docs/#examples/en/loaders/KTX2Loader.detectSupport
  loaders.ktx2.detectSupport( app.renderer )
  loaders.ktx2.setTranscoderPath( 'examples/jsm/libs/basis/' )

  return loaders
}

const load = async (app, name, callback = false) => (
  new Promise(resolve => {
  
    app.loading.set(`file: ${name}`, false)

    const isLoaded = object => {

      const enabledShadows = object => {

        if( object.isObject3D ) {
          object.castShadow = true
          object.receiveShadow = true
        }

        if( ! object.children ) return;

        object.children.map(enabledShadows)
      }
      
      enabledShadows(object)
      if( callback ) callback(object)
      app.loading.set(`file: ${name}`, true)

      resolve(object)
    }

    const fileExtension = name.split('.').pop()

    switch(fileExtension) {
      case 'fbx' : return fbx(app, name, isLoaded)
      case 'obj' : return obj(app, name, isLoaded)
      case 'mtl' : return mtl(app, name, isLoaded)
      case 'ktx2': return ktx2(app, name, isLoaded)
    }
  })
)

export { init }
