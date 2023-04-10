import { load } from '../import/'

/**
 * Avoid reloading the same object objects
 */
const objects = {}

/**
 * TODO: Should be app specific 
 */
const add = (name, args, callback) => {
 
  if( objects[name] ) {
    callback ? callback(objects[ name ]) : null
    return;
  }

  load(name, 
    object => {

      object.walkable = args.walkable ?? false
      objects[name] = object
      
      callback(object)
  })
}

export default {
  objects: add,
  add: add
}
