import { load } from '../import'
import { loadAnimations } from './animation'
import { init as initControls } from './controls/'

const setMainCharacter = (app, character, callback) => {
  load(character.file, object => {

    character.object = object
    character = loadAnimations(app, character)

    character.attributes = {
      speed: 0.3,
      ...(character.attributes ?? {})
    }

    app.scene.add(object)
    app.characters.main = character

    app.controls = initControls(app)

    callback(character)
  })
}

export default {
  setMainCharacter
}
