import { 
  useEffect, 
  useState,
  useRef 
}  from 'react'

const App = ({
  app,
  conversation,
  close
}) => {
 
  const [lastMessage, setLastMessage] = useState(1)

  const content = useRef(null)

  useEffect(() => {
    content.current.scroll({
      top      : content.current.offsetHeight,
      left     : 0, 
      behavior : 'smooth',
    })
  }, [lastMessage])

  const character = app.characters.get(conversation[ lastMessage - 1 ].character)
  const isLastMessage = lastMessage !== conversation.length

  return(
    <div style={ styles.container }>
      <div style={ styles.pictureContainer }>
        <img style={ styles.picture } src={ character.image } />
      </div>
      <div style={ styles.content }>
        <strong style={ styles.name }>
          { character.name }
        </strong>
        <div ref={ content } style={ styles.textContainer }>
          { conversation.slice(0, lastMessage).map(
            (messages, currentMessage) => messages.content.map((text, paragraph) => (
              <div
                key={ `${currentMessage}-${paragraph}` } 
                style={ (lastMessage - 1) === currentMessage ? styles.text : styles.previousText }>
                { text }
              </div>
            ))
          ) }
        </div>
        { isLastMessage
          ? <div style={ styles.next } onClick={ () => setLastMessage(lastMessage + 1) }>
              Next
            </div>
          : <div style={ styles.next } onClick={ close }>
            Close
            </div> }
      </div>
    </div>
  )
}

const styles = {
  container: {
    display        : 'flex',
    justifyContent : 'right',
    width          : '66%',
    fontFamily     : 'arial'
  },
  pictureContainer: {
    width          : '20%',
    marginTop      : 100,
    transform      : 'translateX(20px)',
  },
  picture: {
    width          : '100%',
  },
  content: {
    width          : '55%',
    boxSizing      : 'border-box',
    background     : 'rgba(0, 0, 0, 0.9)',
    height         : '100%',
    color          : 'white',
    padding        : '50px 60px'
  },
  text: {
    padding        : '10px 0px'
  },
  previousText: {
    padding        : '10px 0px',
    opacity        : 0.5
  },
  next: {
    padding        : '10px 0px',
    marginTop      : 20,
    textTransform  : 'uppercase',
    background     : 'white',
    color          : 'black',
    cursor         : 'pointer',
  },
  name: {
    display        : 'flex',
    textTransform  : 'uppercase',
    marginBottom   : 20
  },
  textContainer: {
    maxHeight      : '60%',
    overflow       : 'hidden',
    display        : 'flex',
    flexDirection  : 'column',
    fontSize       : 17,
  }
}

export default App
