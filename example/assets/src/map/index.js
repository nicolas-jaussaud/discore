import discore from '../../../../discore/src'

import { 
  PlaneGeometry, 
  MeshPhongMaterial, 
  Mesh 
} from 'three'

const init = app => {
  
  discore.map.registerSquareType(app, 'yellowEmpty', {
    render : args => emptySquare(0xFFFFE0, args)
  })

  discore.map.registerSquareType(app, 'orangeEmpty',{
    render : args => emptySquare(0xFFA500, args)
  })
  
  /**
   * Map of 3 * 3 squares 
   */
  return [
    [ -300, -100 ],
    [ -100, 100 ],
    [ 100, 300 ]
  ].reduce((map, y, i) => ([
    ...map,
    { 
      type: i %2 === 0 ? 'yellowEmpty' : 'orangeEmpty',
      coordinates: { 
        x: [ -100, 100 ], 
        y: y 
      },
    },{ 
      type: i %2 === 0 ? 'orangeEmpty' : 'yellowEmpty',
      coordinates: { 
        x: [ -300, -100 ], 
        y: y 
      },
    },{ 
      type: i %2 === 0 ? 'orangeEmpty' : 'yellowEmpty',
      coordinates: {
        x: [ 100, 300 ], 
        y: y 
      },
    }
  ]), [])    
}

const emptySquare = (color, {coordinates, app}) => {

  const geometry  = new PlaneGeometry( 200, 200 )
  const material  = new MeshPhongMaterial({ color: color })
  const mesh      = new Mesh( geometry, material )

  mesh.position.x = (coordinates.x[1] + coordinates.x[0]) / 2
  mesh.position.y = (coordinates.y[1] + coordinates.y[0]) / 2
  mesh.position.z = 0
  
  app.scene.add(mesh)
}

export {
  init
} 
