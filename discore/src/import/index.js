import { fbx, obj, mtl } from './loaders'

const load = async (name, callback) => {

  const fileExtension = name.split('.').pop()

  switch(fileExtension) {
    case 'fbx': return fbx(name, callback)
    case 'obj': return obj(name, callback)
    case 'mtl': return mtl(name, callback)
  }
  
} 

export { load }
