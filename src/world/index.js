import { cache } from './cache' 
import { 
  Box3, 
  Vector3
} from 'three'

const add = (app, name, args, callback) => {
  app.loaders.load(name, 
    object => {

      object.walkable = args.walkable ?? false
      app.map.current.objects.push(object)
      
      callback(object)
  })
}

/**
 * @see https://discourse.threejs.org/t/avoiding-collision-between-two-boxes/11235/9
 */
const hasCollisions = (app, item) => {

  let hasCollision = false

  const objectHitBox = item instanceof Vector3 
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
  objects       : [],
  add           : (name, args, callback) => add(app, name, args, callback),
  hasCollisions : object => hasCollisions(app, object),
  cache         : cache(app)
})

export { init }
