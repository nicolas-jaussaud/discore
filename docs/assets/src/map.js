const map = [
  // Center
  { 
    type: 'floor',
    coordinates: { 
      x: [ -100, 100 ], 
      y: [ -100, 100 ]
    },
    config: {
      type: 'empty',
    }
  },
  // Top corner
  { 
    type: 'wall',
    coordinates: { 
      x: [ -300, -100 ], 
      y: [ 100, 300 ]
    },
    config: {
      position: 'top-corner',
      type: 1,
      column: {
        type: 3,
        position: 'top-corner'
      }
    }
  },
  // Top left
  { 
    type: 'wall',
    coordinates: { 
      x: [ -300, -100 ], 
      y: [ -100, 100 ]
    },
    config: {
      position: 'top-left',
      type: 2,
    }
  },
  // Left corner
  { 
    type: 'wall',
    coordinates: { 
      x: [ -300, -100 ], 
      y: [ -300, -100 ]
    },
    config: {
      position: 'left-corner',
      type: 1,
      column: {
        type: 3,
        position: 'left-corner'
      }
    }
  },
  // Top right
  { 
    type: 'wall',
    coordinates: { 
      x: [ -100, 100 ], 
      y: [ 100, 300 ]
    },
    config: {
      position: 'top-right',
      type: 5,
    }
  },
  // Right corner
  { 
    type: 'wall',
    coordinates: { 
      x: [ 100, 300 ], 
      y: [ 100, 300 ]
    },
    config: {
      position: 'right-corner',
      type: 1,
      column: {
        type: 3,
        position: 'right-corner'
      }
    }
  },
  // Bottom right
  { 
    type: 'wall',
    coordinates: { 
      x: [ 100, 300 ], 
      y: [ -100, 100 ]
    },
    config: {
      position: 'bottom-right',
      type: 5,
    }
  },
  // Bottom corner
  { 
    type: 'wall',
    coordinates: { 
      x: [ 100, 300 ], 
      y: [ -300, -100 ]
    },
    config: {
      position: 'bottom-corner',
    }
  },
  // Bottom left
  { 
    type: 'wall',
    coordinates: { 
      x: [ -100, 100 ], 
      y: [ -300, -100 ]
    },
    config: {
      position: 'bottom-left',
    }
  },
]

export { map }
