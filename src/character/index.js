import { loadAnimations } from './animation'
import { init as initActions } from './actions'

const add = (app, character, callback) => {
  app.loading.set(`character: ${character.name}`, false)
  app.loaders.load(character.file, object => {

    character.object = object
    character.object.walkable = false
    character.attributes = {
      speed: {
        run: 0.5,
        walk: 0.1,
        ...(character?.attributes?.speed ?? {})
      },
      ...(character.attributes ?? {})
    }

    loadAnimations(app, character, character => {

      character.actions = initActions(app, character)
      app.characters.list[ character.name ] = character
      
      callback(character)
      app.loading.set(`character: ${character.name}`, true)
    })
  })
}

const getMain = app => (
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
  get     : name => app.characters.list[ name ] ?? false,
  getAll  : () => app.characters.list,
  getMain : () => getMain(app),
  setMain : name => setMain(app, name)
})

export { init }
