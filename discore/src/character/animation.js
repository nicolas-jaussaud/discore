import { AnimationMixer } from 'three'
import { load } from '../import'

const loadAnimations = (app, character) => {

  character.mixer = new AnimationMixer(character.object)

  for( const name in character.animations ?? [] ) {
    loadAnimation(
      character.animations[ name ],
      animation =>  {
        // Bad, should not use app here
        app.characters.main.animations[ name ] = character.mixer.clipAction(animation.animations[0]) 
        if( name === 'idle' ) app.characters.main.startAnimaion('idle')
      }
    )
  }

  character.startAnimaion = animation => start(character.animations ?? [], animation)
  character.stopAnimaion = animation => stop(character.animations ?? [], animation)
  
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
