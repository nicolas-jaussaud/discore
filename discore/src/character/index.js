import { load } from '../import'
import { loadAnimations } from './animation'

const add = (app, character, callback) => {
  load(character.file, object => {

    character.object = object
    character = loadAnimations(app, character)

    character.attributes = {
      speed: 0.3,
      ...(character.attributes ?? {})
    }

    app.characters.list[ character.name ] = character

    callback(character)
  })
}

const getMain = (app) => (
  app.characters.main
    ? app.characters.list[ app.characters.main ]
    : false
)

const setMain = (app, name) => {
  app.characters.main = app.characters.list[name] ? name : false 
}

const init = app => ({
  main    : false,
  list    : {},
  add     : (character, callback) => add(app, character, callback),
  getMain : name => getMain(app),
  setMain : name => setMain(app, name)
})

export { init }
