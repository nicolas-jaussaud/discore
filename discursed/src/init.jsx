import { createRoot } from 'react-dom/client'
import App from './components/App'

const open = (conversation, app, callback) => {
  
  const { element } = app
  element.classList.add('discursed-container')
  Object.assign(element.style, styles)

  const root = createRoot(element)
  root.render(<App 
    conversation={ conversation }
    app={ app }
    close={ () => {
      root.unmount()
      callback()
    }}
  />)
}

const styles = {
  position       : 'absolute',
  width          : '100%',
  height         : '100%',
  maxWidth       : '1440px',
  zIndex         : 999,
  top            : 0,
  background     : 'none',
  left           : '50%',
  transform      : 'translate(-50%, 0)',
  display        : 'flex',
  justifyContent : 'right'
}

const init = ({
  element
}) => {
  const app = { element }

  app.open = (conversation, callback) => open(conversation, app, callback)
  app.characters = {
    list : {},
    add  : (name, args) => app.characters.list[ name ] = args,
    get : name => app.characters.list[ name ] ?? false
  }
  
  return app
}

export default init
