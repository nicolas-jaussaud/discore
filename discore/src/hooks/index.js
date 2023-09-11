const init = () => {

  const actions = {}
  
  const doAction = (name, args={}) => (actions[name] || []).forEach(callback => callback(args))
  
  const addAction = (name, callback) => {

    if( ! actions[name] ) actions[name] = []

    actions[name].push(callback)
  }

  const removeAction = (name, callback) => {
    if (actions[name]) {
      actions[name] = actions[name].filter(cb => cb !== callback)
    }
  }

  return {
    addAction: addAction,
    doAction: doAction,
    removeAction: removeAction
  }
}

export { init }
