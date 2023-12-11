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

const setStatus = ({ loading }, name, status = true) => {

  if( status === false ) {
    loading.elements.container.childNodes[0].nodeValue = 'Loading...'
    Object.assign(
      loading.elements.container.style,
      style.container
    )
  }
  
  loading.list.update(name, status)

  if( loading.list.isLoaded() ) stopLoading(loading)
}

const stopLoading = (loading) => {

  const removeLoadingScreen = () => {
    Object.assign(
      loading.elements.container.style, 
      { display: 'none' }
    )
    loading.list.clear()
    app.hooks.doAction('loadComplete')
  }

  if( loading.firstInit !== true ) {
    removeLoadingScreen()
    return;
  }
    
  loading.elements.button.removeAttribute('disabled')
  loading.elements.container.childNodes[0].nodeValue = 'Ready!'
  
  Object.assign(
    loading.elements.button.style, 
    { 
      ...style.button, 
      ...style.buttonReady 
    }
  )
  
  loading.elements.button.addEventListener('click', event => {
    loading.firstInit = false
    loading.elements.button.remove()
    removeLoadingScreen()
    event.stopPropagation()
  })
}

export {
  init
}
