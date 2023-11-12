import { debug } from './debug'

const render = (app, renderer) => {

  if( app.status === 'paused' ) return;
  if( app.environment === 'dev' ) debug(app)

  app.hooks.doAction('beforeRender')

  requestAnimationFrame(app.render)

  const mainCharacter = app?.characters.getMain()

  /**
   * Make sure the camera follows the main character 
   */
  if( app.camera && mainCharacter ) {

    const characterPostion = mainCharacter.object.position
    const camera = app.camera

    if( app.view.current === 'orthographic' ) {
      camera.position.x = characterPostion.x + 400
      camera.position.y = characterPostion.y - 400
    }
    else if( app.view.current === 'top' ) {
      camera.position.x = characterPostion.x
      camera.position.y = characterPostion.y
    }
  }

  /**
   * Character animations
   */
  const characters = app?.characters.getAll()
  const delta = app.clock.getDelta()

  for( const name in characters ) {
    const mixer = characters[name].mixer ?? false
    if( mixer && mixer.update ) mixer.update(delta)
  }

  if( ! app.map.current ) return;

  renderer.render(app.map.current.scene, app.camera)

  app.hooks.doAction('afterRender')
}

export { render }
