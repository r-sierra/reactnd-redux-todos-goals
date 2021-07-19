import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'

const checker = (store) => (next) => (action) => {
  if (action.type === ADD_TODO || action.type === ADD_GOAL) {
    var name = action.todo ? action.todo.name : action.goal.name
    if (name.toLowerCase().includes('kill'))
      return alert('No killing allowed!')
  }
  return next(action)  // next middleware or dispatch
}

export default checker
