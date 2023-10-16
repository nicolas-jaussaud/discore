const init = () => {

  const actions = {}
  const filters = {}
  
  const doAction = (name, args = {}) => (actions[name] || []).forEach(callback => callback(args))
  const applyFilters = (name, initialValue = '') => (
    (filters[name] || []).reduce((value, callback) => callback(value), initialValue)
  )
  
  const addAction = (name, callback) => {
    if( ! actions[name] ) actions[name] = []
    actions[name].push(callback)
  }

  const addFilter = (name, callback) => {
    if( ! filters[name] ) filters[name] = []
    filters[name].push(callback)
  }

  const removeAction = (name, callback) => {
    if (actions[name]) {
      actions[name] = actions[name].filter(cb => cb !== callback)
    }
  }

  const removeFilter = (name, callback) => {
    if (filters[name]) {
      filters[name] = filters[name].filter(cb => cb !== callback)
    }
  }

  return {
    addAction: addAction,
    doAction: doAction,
    addFilter: addFilter,
    applyFilters: applyFilters,
    removeAction: removeAction,
    removeFilter: removeFilter
  }
}

export { init }
