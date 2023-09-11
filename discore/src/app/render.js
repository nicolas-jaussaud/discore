import { debug } from './debug'

const render = (app, renderer) => {

  if( app.environment === 'dev' ) debug(app)

  app.hooks.doAction('beforeRender')

  requestAnimationFrame(app.render)

  /**
   * Make sure the camera follows the main character 
   */
  if( app.camera && app.characters.main ) {

    const character = app.characters.main.object.position
    const camera = app.camera

    if( app.view.current === 'orthographic' ) {
      camera.position.x = character.x + 400
      camera.position.y = character.y - 400
    }
    else if( app.view.current === 'top' ) {
      camera.position.x = character.x
      camera.position.y = character.y
    }
  }
  
  /**
   * Make sure to animate character animations
   */
  if( app.characters.main && app.characters.main.mixer ) {

    const mixer = app.characters.main.mixer
    const delta = app.clock.getDelta()

    if( mixer.update ) mixer.update(delta)
  }
  
  if( ! app.map.current ) return;

  renderer.render(app.map.current.scene, app.camera)

  app.hooks.doAction('afterRender')
}

export { render }
