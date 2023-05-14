const map = [

  // Center square

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
      type: 3,
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
      type: 3,
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
      renderWall: false,
      column: {
        type: 3,
        position: 'top-corner'
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

  // Bottom left hall
  { 
    type: 'wall',
    coordinates: { 
      x: [ -300, -100 ], 
      y: [ -500, -300 ]
    },
    config: {
      position: 'top-left',
      type: 5,
      floor: {
        type: 2
      }
    }
  },
  { 
    type: 'wall',
    coordinates: { 
      x: [ -300, -100 ], 
      y: [ -700, -500 ]
    },
    config: {
      position: 'top-left',
      type: 5,
      floor: {
        type: 2
      }
    }
  },

  // Top right hall
  { 
    type: 'wall',
    coordinates: { 
      x: [ 100, 300 ], 
      y: [ 300, 500 ]
    },
    config: {
      position: 'top-left',
      type: 5,
      floor: {
        type: 2
      }
    }
  },
  { 
    type: 'wall',
    coordinates: { 
      x: [ 100, 300 ], 
      y: [ 500, 700 ]
    },
    config: {
      position: 'top-left',
      type: 5,
      floor: {
        type: 2
      },
    }
  }
]

export { map }
