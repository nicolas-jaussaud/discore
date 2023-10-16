import { LoadingManager } from 'three'

const init = app => {

  /**
   * @see https://threejs.org/docs/#api/en/loaders/managers/LoadingManager.setURLModifier
   */
  const manager = new LoadingManager

  manager.setURLModifier(url => (
    app.hooks.applyFilters('loadRessourceURL', url)
  ))

  return manager
}

export { init }
