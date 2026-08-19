import style from './style'
import { initList } from './list'

const init = (app, element) => {

  const loadingElement = document.createElement('div')
  loadingElement.textContent = 'Loading...'

  const loadingButton = document.createElement('button')
  loadingButton.textContent = 'Start'
  loadingButton.setAttribute('disabled', true)

  const list = initList(app)

  loadingElement.appendChild(list.element)
  loadingElement.appendChild(loadingButton)

  Object.assign(
    list.element.style, 
    style.list
  )

  Object.assign(
    loadingButton.style, 
    { 
      ...style.button, 
      ...style.buttonDisabled 
    })

  element.style.background = 'black'
  element.appendChild(loadingElement)

  return {
    firstInit : true,
    list      : list,
    set       : (part, status = true) => setStatus(app, part, status),
    elements  : {
      container : loadingElement,
      button    : loadingButton
    }
  }
}

const setStatus = (app, name, status = true) => {

  if( status === false ) {
    app.loading.elements.container.childNodes[0].nodeValue = 'Loading...'
    Object.assign(
      app.loading.elements.container.style,
      style.container
    )
  }

  app.loading.list.update(name, status)

  if( app.loading.list.isLoaded() ) stopLoading(app)
}

const stopLoading = app => {

  const removeLoadingScreen = () => {
    Object.assign(
      app.loading.elements.container.style,
      { display: 'none' }
    )
    app.loading.list.clear()
    app.hooks.doAction('loadComplete')
  }

  if( app.loading.firstInit !== true ) {
    removeLoadingScreen()
    return;
  }

  app.loading.elements.button.removeAttribute('disabled')
  app.loading.elements.container.childNodes[0].nodeValue = 'Ready!'

  Object.assign(
    app.loading.elements.button.style,
    { 
      ...style.button, 
      ...style.buttonReady 
    }
  )

  app.loading.elements.button.addEventListener('click', event => {
    app.loading.firstInit = false
    app.loading.elements.button.remove()
    removeLoadingScreen()
    event.stopPropagation()
  })
}

export {
  init
}
