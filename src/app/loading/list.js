import style from './style'

const add = (app, name) => {

  const part = app.loading.list.childs[ name ] = { 
    element : document.createElement('li'), 
    status  : false,
    text    : text => app.loading.list.childs[ name ].element.textContent = text,
  }

  part.text(`Loading ${name}...`)
  setListStyle(part, false)
  
  app.loading.list.element.appendChild(part.element)  
}

const update = (app, name, status) => {

  if( ! app.loading.list.childs[ name ] ) {
    app.loading.list.add(name)
  }

  const part = app.loading.list.childs[ name ]
  part.status = status
  setListStyle(part, status)

  part.text(
    status 
      ? `Loaded: ${name}` 
      : `Loading ${name}...`
  )
}

const setListStyle = (part, status) => {
  Object.assign(
    part.element.style, 
    status 
      ? style.loaded 
      : style.loading
  )
}

const clear = app => {
  app.loading.list.childs = {}
  app.loading.list.element.textContent = ''
}

const isLoaded = app => (
  Object.keys(app.loading.list.childs)
    .map(part => app.loading.list.childs[part].status)
    .every(Boolean)
)

const initList = app => ({
  element  : document.createElement('ul'),
  childs   : {},
  clear    : () => clear(app),
  isLoaded : () => isLoaded(app),
  add      : name => add(app, name),
  update   : (name, status) => update(app, name, status)
})

export { initList }
