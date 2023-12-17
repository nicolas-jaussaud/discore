import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { fbx, obj, mtl } from './loaders'
import { init as initManager } from './manager'

const init = app => {

  const manager = initManager(app)
  
  return {
    fbx   : new FBXLoader(manager),
    mtl   : new MTLLoader(manager),
    obj   : new OBJLoader(manager),
    debug : app.environment === 'development',
    load  : (name, callback = false) => load(app, name, callback)
  }
}

const load = async (app, name, callback = false) => {
  
  app.loading.set(`file: ${name}`, true)

  const isLoaded = object => {
    if( callback ) callback(object)
    app.loading.set(`file: ${name}`, true)
  }

  const fileExtension = name.split('.').pop()

  switch(fileExtension) {
    case 'fbx': return fbx(app, name, isLoaded)
    case 'obj': return obj(app, name, isLoaded)
    case 'mtl': return mtl(app, name, isLoaded)
  }
} 

export { init }
