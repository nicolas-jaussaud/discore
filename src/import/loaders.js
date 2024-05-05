const fbx = async (app, path, callback = false) => (
  app.loaders.fbx.load(path,
    fbx => {
      
      fbx.castShadow    = true
      fbx.receiveShadow = true

      if(callback) callback(fbx)
    },
    xhr   => app.loaders.debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => app.loaders.debug ? console.error('An error happened: ' + error) : ''
  )
)

const obj = async (app, path, callback = false) => (
  app.loaders.obj.load(path, 
    obj => {
    
      obj.castShadow    = true
      obj.receiveShadow = true
      
      if(callback) callback(obj)
    },
    xhr   => app.loaders.debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => app.loaders.debug ? console.error('An error happened: ' + error) : ''
  )    
)

const mtl = async (app, path , callback = false) => (
  app.loaders.mtl.load(path, 
    mtl => {
    
      mtl.preload()
      loaders.obj.setMaterials( mtl )
      
      mtl.castShadow    = true
      mtl.receiveShadow = true

      if(callback) callback(mtl)
    },
    xhr   => app.loaders.debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => app.loaders.debug ? console.error('An error happened: ' + error) : ''
  )
)

const ktx2 = async (app, path , callback = false) => (
  app.loaders.ktx2.load(path, 
    ktx2 => {
      
      ktx2.castShadow    = true
      ktx2.receiveShadow = true

      if(callback) callback(ktx2)
    },
    xhr   => app.loaders.debug ? console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) : '',
    error => app.loaders.debug ? console.error('An error happened: ' + error) : ''
  )
)

export {
  fbx,
  mtl,
  obj,
  ktx2
}
