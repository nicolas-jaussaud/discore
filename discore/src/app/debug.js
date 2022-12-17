import { AxesHelper } from 'three'

const debug = app => {

  /**
   * @see https://threejs.org/docs/#api/en/helpers/AxesHelper
   */
  app.scene.add( new AxesHelper(window.innerHeight) )
}

export { debug }
