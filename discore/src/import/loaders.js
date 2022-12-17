import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'

const debug = true
const loaders =  {
  fbx: new FBXLoader(),
  mtl: new MTLLoader(),
  obj: new OBJLoader()
}

const fbx = async (path, callback = false) => (
  loaders.fbx.load(path,
    fbx => {
      
      fbx.castShadow    = true
      fbx.receiveShadow = true
      
      if(callback) callback(fbx)
    },
    xhr   => debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => debug ? console.error('An error happened: ' + error) : ''
  )
)

const obj = async (path, callback = false) => (
  loaders.obj.load(path, 
    obj => {
    
      obj.castShadow    = true
      obj.receiveShadow = true
      
      if(callback) callback(obj)
    },
    xhr   => debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => debug ? console.error('An error happened: ' + error) : ''
  )    
)

const mtl = async (path , callback = false) => (
  loaders.mtl.load(path, 
    mtl => {
    
      mtl.preload()
      loaders.obj.setMaterials( mtl )
      
      mtl.castShadow    = true
      mtl.receiveShadow = true

      if(callback) callback(mtl)
    },
    xhr   => debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => debug ? console.error('An error happened: ' + error) : ''
  )
)

export {
  fbx,
  mtl,
  obj
}
