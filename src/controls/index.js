import { mouseEvents } from './sources/mouse'
import { keyboardEvents } from './sources/keyboard'

const init = app => ({
  sources: {
    mouse: mouseEvents(app),
    keyboard: keyboardEvents(app) 
  }
})

export { init }
