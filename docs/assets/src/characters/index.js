
import maps from '../maps/'
import stories from './stories/'
import createCharacter from './create'

const init = app => {

  /**
   * Main character
   */
  createCharacter(app, 'main', 'yellow', character => {
    app.characters.setMain(character.name)
    app.map.load('map1', maps['map1'], '0|0')
  })

  /**
   * NPC on map1
   */
  app.hooks.addAction('mapLoaded', args => {

    if( args.name !== 'map1' ) return;

    createCharacter(app, 'peasant1', 'brown', character => {

      app.map.current.scene.add(character.object)
      app.map.moveCharacterOnSquare('2|-4', character)

      // Loop on defined actions
      const doAction = index => {
        stories[0][ index ](character).then(() => doAction(
          stories[0].length - 1 !== index ? index + 1 : 0 
        ))
      }
      doAction(0)
    })
  })

  /**
   * NPC on map2
   */
  app.hooks.addAction('mapLoaded', args => {

    if( args.name !== 'map2' ) return;

    createCharacter(app, 'peasant2', 'green', character => {
      
      app.map.current.scene.add(character.object)
      app.map.moveCharacterOnSquare('0|-1', character)

      // Loop on defined actions
      const doAction = index => {
        stories[1][ index ](character).then(() => doAction(
          stories[1].length - 1 !== index ? index + 1 : 0 
        ))
      }
      doAction(0)
    })

    createCharacter(app, 'peasant3', 'blue', character => {

      app.map.current.scene.add(character.object)

      const coordinates = app.map.getCoordinateBySquare('2|-2')
      character.startAnimation('sit')
      character.object.position.set(
        coordinates.x - 75,
        coordinates.y - 100,
        -10
      )
    })
  })
}



export { init }
