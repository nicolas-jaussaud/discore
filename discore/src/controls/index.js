import { mouseEvents } from './sources/mouse'
import { keyboardEvents } from './sources/keyboard'
import { move } from '../character/actions/move'

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
          app.characters.getMain().stopAnimation('idle')
          app.characters.getMain().startAnimation('run')
        },
        stop: () => {
          app.controls.actions.run.isActive = false
          app.characters.getMain().stopAnimation('run')
          app.characters.getMain().startAnimation('idle')
        }
      },
      move: (x, y, z) => move(
        app, 
        { x: x, y: y, z: z },
        app.characters.getMain()
      ),
      stop: () => {
        app.controls.currentAction = false
        app.controls.actions.run.animations.stop()
      }
    }
  }
})

export { init }
