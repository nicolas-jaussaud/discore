import { cache } from './cache' 
import { instance } from './instances' 
import { remove } from './helpers'
import { 
  Box3, 
  Vector3
} from 'three'

const add = (app, name, args, callback) => {
  app.loaders.load(name, 
    object => {
      callback(
        app.world.registerObject(object, args)
      )
  })
}

const registerObject = (app, object, args = []) => {
  
  const action = () => {
    
    object.walkable = args.walkable ?? false
    app.map.current.objects.push(object) 
    
    app.hooks.removeAction('mapLoaded', action)
    
    return object
  }
  
  // Too early
  if( ! app.map.current.objects ) {
    app.hooks.addAction('mapLoaded', action)
    return object 
  }

  return action()
} 

/**
 * @see https://discourse.threejs.org/t/avoiding-collision-between-two-boxes/11235/9
 */
const hasCollisions = (app, item) => {

  let hasCollision = false
  let objectHitBox = false

  if( item instanceof Box3 ) objectHitBox = item 
  else objectHitBox = item instanceof Vector3 
      ? new Box3().setFromCenterAndSize(item, new Vector3(50, 50, 50))
      : new Box3().setFromObject(item)
  
  app.map.current.objects.map(object => {

    if( object.walkable || hasCollision ) return;

    const hitBox = new Box3().setFromObject(object)
    const collision = objectHitBox.intersectsBox(hitBox)

    if( collision ) hasCollision = object
  })

  return hasCollision
}

const init = app => ({
  objects        : [],
  add            : (name, args, callback) => add(app, name, args, callback),
  hasCollisions  : object => hasCollisions(app, object),
  registerObject : (object, args = []) => registerObject(app, object, args),
  cache          : cache(app),
  instance       : instance(app),
  remove         : object => remove(app, object)
})

export { init }
