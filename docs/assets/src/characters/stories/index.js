import story1 from './character1'
import story2 from './character2'

const stories = name => {
  switch(name) {
    case '1':
      return story1
    case '2':
      return story2
  }  
}

export default stories
