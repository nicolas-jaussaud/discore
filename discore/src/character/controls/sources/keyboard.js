const keyboardEvents = app => {

  document.addEventListener('keydown', event => {
    switch(event.key) {
      case 'c':
        app.view.set('top')
        break
    }
  })

  document.addEventListener('keyup', event => {
    switch(event.key) {
      case 'c':
        app.view.set('orthographic')
        break
    }
  })
}

export { keyboardEvents }
