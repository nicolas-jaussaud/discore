export default {
  container : {
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'center',
    alignItems     : 'center',
    position       : 'absolute',
    width          : '100%',
    height         : '100%',
    background     : 'rgba(0, 0, 0, 0.8)',
    top            : 0,
    left           : 0,
    textAlign      : 'center',
    color          : 'white',
    fontSize       : '40px'
  },
  list : {
    fontSize       : '15px',
    maxHeight      : '50vh',
    overflow       : 'auto',
    textAlign      : 'left',
    padding        : '0 20px'
  },
  loaded : {
    listStyle      : 'none',
    color          : 'green',
  },
  loading : {
    listStyle      : 'none',
  },
  button : {
    width          : '100px',
    border         : '1px white solid',
    background     : 'transparent',
    color          : 'white',
    fontWeight     : 'bold',
    textTransform  : 'uppercase',
    padding        : '10px',
    margin         : '10px'
  },
  buttonReady : {
    opacity        : 1,
    cursor         : 'pointer'
  },
  buttonDisabled : {
    opacity        : 0.2
  }
}
