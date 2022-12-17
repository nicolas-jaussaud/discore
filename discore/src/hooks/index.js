const init = () => {

  const actions = {}
  
  const doAction = name => (actions[name] || []).forEach(callback => callback())
  const addAction = (name ,callback) => {

    if( ! actions[name] ) actions[name] = []

    actions[name].push(callback)
  }

  return {
    addAction: addAction,
    doAction: doAction
  }
}

export { init }
