import { mouseEvents } from './sources/mouse'
import { keyboardEvents } from './sources/keyboard'
import { move } from '../actions/move'

const init = app => ({
  sources: {
    mouse: mouseEvents(app),
    keyboard: keyboardEvents(app) 
  },
  currentAction: false,
  actions: {
    run: {
      isActive: false,
      animations: {
        start: () => {
          app.controls.actions.run.isActive = true
          app.characters.main.stopAnimation('idle')
          app.characters.main.startAnimation('run')
        },
        stop: () => {
          app.controls.actions.run.isActive = false
          app.characters.main.stopAnimation('run')
          app.characters.main.startAnimation('idle')
        }
      },
      move: (x, y, z) => move(app, { x: x, y: y, z: z }),
      stop: () => {
        app.controls.currentAction = false
        app.controls.actions.run.animations.stop()
      }
    }
  }
})

export { init }
