const style = {
  position  : 'absolute',
  width     : '100%',
  height    : '100%',
  background: 'black',
  top       : 0,
  left      : 0,
  opacity   : 0.5,
  textAlign : 'center',
  color     : 'white',
  fontSize  : '60px'
}

/**
 * TODO: Possibility to wait for multiple things to load
 */
const init = element => {

  const loadingElement = document.createElement('div')
  const textnode = document.createTextNode('Loading...')

  loadingElement.appendChild(textnode)  
  Object.assign(loadingElement.style, style)

  element.appendChild(loadingElement)

  return {
    element: loadingElement,
    set: (status, text = 'Loading') => {
      
      if( ! status ) {
        loadingElement.setAttribute('style', 'display: none')
        return;
      } 

      Object.assign(loadingElement.style, style)
      loadingElement.textContent = text
    }
  }
}

export {
  init
}
