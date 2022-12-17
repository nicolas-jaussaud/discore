import { mouseEvents } from './sources/mouse'

const init = app => ({
  sources: {
    mouse: mouseEvents(app)
  },
  actions: {
    run: {
      start: () => {
        app.characters.main.stopAnimaion('idle')
        app.characters.main.startAnimaion('run')
      },
      stop: () => {
        app.characters.main.stopAnimaion('run')
        app.characters.main.startAnimaion('idle')
      },
      move: (x, y, z) => {
        
        const character = app.characters.main.object

        // Should find a better way to handle deplacement
        const xDeplacment = (x - character.position.x) / 100
        const yDeplacment = (y - character.position.y) / 100

        app.controls.actions.run.start()
        
        let count = 0

        const move = setInterval(
          () => {
            count++

            character.position.x += xDeplacment
            character.position.y += yDeplacment
            
            if( count >= 100 ) {
              app.controls.actions.run.stop()
              clearInterval(move)
            }
          }
        , 10)
      }
    }
  }
})

export { init }
