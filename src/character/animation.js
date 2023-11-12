import { AnimationMixer } from 'three'

const loadAnimations = (app, character, callback) => {

  character.mixer = new AnimationMixer(character.object)
  
  const animations = character.animations ?? []
  character.animations = {}
  
  // Need a less ugly way to do this
  const promises = []
  for( const name in animations ?? [] ) {
    promises.push(
      new Promise(resolve => (
        loadAnimation(
          app,
          animations[ name ],
          animation => {
            character.animations[ name ] = character.mixer.clipAction(animation.animations[0]) 
            if( name === 'idle' ) character.startAnimation('idle')
            resolve()
          }
        )
      ))
    )
  }

  character.startAnimation = animation => start(character.animations ?? [], animation)
  character.stopAnimation = animation => stop(character.animations ?? [], animation)

  Promise.all(promises).then(() => callback(character))
}

const loadAnimation = (app, file, callback) => (
  app.loaders.load(file, callback)
)

const start = (animations, action) => (
  animations[ action ] ? animations[ action ].play() : ''
)

const stop = (animations, action) => (
  animations[ action ] ? animations[ action ].stop() : ''
)

export { loadAnimations }
