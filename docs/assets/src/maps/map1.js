const map1 = {

  '2|0': { type: 'grass' },
  '1|0': { type: 'grass' },
  '0|0': { type: 'path' },
  '-1|0': { type: 'grass' },
  '-2|0': { type: 'grass' },

  '-2|1': { type: 'grass' },
  '-1|1': { type: 'grass' },
  '0|1': { type: 'tree', config: { type: 1 } },
  '1|1': { type: 'grass' },
  '2|1': { type: 'tree', config: { type: 1 } },

  '-2|-1': { type: 'water' },
  '-1|-1': { type: 'tree', config: { type: 2 } },
  '0|-1': { type: 'path' },
  '1|-1': { type: 'grass' },
  '2|-1': { type: 'tree', config: { type: 3 } },

  '2|-2': { type: 'water' },
  '1|-2': { type: 'water' },
  '0|-2': { type: 'path' },
  '-1|-2': { type: 'water' },
  '-2|-2': { type: 'water' },

  '0|-3': { type: 'path' },
  '2|-3': { type: 'water' },
  '1|-3': { type: 'tree', config: { type: 1 } },
  '-1|-3': { type: 'grass' },
  '-2|-3': { type: 'grass' },

  '0|-4': { type: 'path' },
  '1|-4': { type: 'grass' },
  '2|-4': { type: 'grass' },
  '-1|-4': { type: 'tree', config: { type: 2 } },
  '-2|-4': { type: 'grass' },

  '0|-5': { type: 'path' },
  '1|-5': { type: 'grass' },
  '2|-5': { type: 'grass' },
  '-1|-5': { type: 'grass' },
  '-2|-5': { type: 'grass' },

  '0|-6': { type: 'path-exit', config: { map: 'map2', square: '0|1', arrow: 'bottom' } },
}

export { map1 }
