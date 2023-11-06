import conversation1 from './conversation1'
import conversation2 from './conversation2'
import conversation3 from './conversation3'

const init = (app, discussions) => {

  discussions.characters.add('lost-peasant', {
    name  : 'Lost peasant',
    image : './assets/ressources/characters/peasant/images/brown.png'
  })

  discussions.characters.add('chill-peasant', {
    name  : 'Chill peasant',
    image : './assets/ressources/characters/peasant/images/blue.png'
  })

  discussions.characters.add('peasant', {
    name  : 'Confused peasant',
    image : './assets/ressources/characters/peasant/images/green.png'
  })

  /**
   * Hooks trigger in discore when user click on a character
   * 
   * If character NPC, we move to the character and if the charater is still there when we arrive
   * we open the associated conversation
   */
  app.hooks.addAction('clickOnCharacter', character => followAndTalk(character, discussions))
}

const openConversation = (discussions, app, character) => {
  switch(character) {
    case 'peasant1':
      app.stop()
      discussions.open(conversation1, app.start)
      break;
    case 'peasant2':
      app.stop()
      discussions.open(conversation2, app.start)
      break;
    case 'peasant3':
      app.stop()
      discussions.open(conversation3, app.start)
      break;
  }
}

const followAndTalk = (character, discussions, prevSquare = false) => {

  const main = app.characters.getMain()
  
  /**
   * Start conversation only when main user will be next to character
   */
  main.actions.move.start(
    character.object.position.x,
    character.object.position.y,
    0
  ).then(() => {

    const characterSquare = app.map.getSquareByCoordinates({
      x: character.object.position.x,
      y: character.object.position.y
    })
    const currentSquare = app.map.getSquareByCoordinates({
      x: main.object.position.x,
      y: main.object.position.y
    })

    if( currentSquare.key !== characterSquare.key ) {
      if( currentSquare !== prevSquare) followAndTalk(character, discussions, currentSquare)
      return;
    }

    openConversation(discussions, app, character.name)
  })
      
}

export { init }
