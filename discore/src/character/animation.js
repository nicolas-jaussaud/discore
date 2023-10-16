import { AnimationMixer } from 'three'
import { load } from '../import'

const loadAnimations = (app, character) => {

  character.mixer = new AnimationMixer(character.object)
  
  const animations = character.animations ?? []
  character.animations = {}
  
  for( const name in animations ?? [] ) {
    loadAnimation(
      animations[ name ],
      animation =>  {
        character.animations[ name ] = character.mixer.clipAction(animation.animations[0]) 
        if( name === 'idle' ) character.startAnimation('idle')
      }
    )
  }

  character.startAnimation = animation => start(character.animations ?? [], animation)
  character.stopAnimation = animation => stop(character.animations ?? [], animation)
  
  return character
}

const loadAnimation = (file, callback) => (
  load(file, callback)
)

const start = (animations, action) => (
  animations[ action ] ? animations[ action ].play() : ''
)

const stop = (animations, action) => (
  animations[ action ] ? animations[ action ].stop() : ''
)

export { loadAnimations }
