import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { fbx, obj, mtl } from './loaders'
import { init as initManager } from './manager'

const init = app => {

  const manager = initManager(app)
  
  return {
    fbx: new FBXLoader(manager),
    mtl: new MTLLoader(manager),
    obj: new OBJLoader(manager),
    debug: app.environment !== 'dev',
    load: (name, callback = false) => load(app, name, callback)
  }
}

const load = async (app, name, callback = false) => {
  
  const fileExtension = name.split('.').pop()

  switch(fileExtension) {
    case 'fbx': return fbx(app, name, callback)
    case 'obj': return obj(app, name, callback)
    case 'mtl': return mtl(app, name, callback)
  }
  
} 

export { init }
