import { mouseEvents } from './sources/mouse'
import { keyboardEvents } from './sources/keyboard'
import { move } from '../actions/move'

const init = app => ({
  sources: {
    mouse: mouseEvents(app),
    keyboard: keyboardEvents(app) 
  },
  actions: {
    run: {
      isMoving: false,
      animations: {
        start: () => {
          app.controls.actions.run.isMoving = true
          app.characters.main.stopAnimation('idle')
          app.characters.main.startAnimation('run')
        },
        stop: () => {
          app.controls.actions.run.isMoving = false
          app.characters.main.stopAnimation('run')
          app.characters.main.startAnimation('idle')
        }
      },
      move: (x, y, z) => move(app, { x: x, y: y, z: z })
    }
  }
})

export { init }
