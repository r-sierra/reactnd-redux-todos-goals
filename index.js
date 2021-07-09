// Library Code
function createStore(reducer) {
  /**
  * The store should have 4 parts:
  * The state
  * Get the state
  * Listen to changes on the state
  * Update the state
  */

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// App Code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOOGLE_TODO = 'TOOGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Todos reducer
function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id)
    case TOOGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete }))
    default:
      return state
  }
}

// Goals reducer
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id)
    default:
      return state
  }
}

// Root reducer
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

let store = createStore(app)
store.subscribe(() => {
  console.log('The new state is ', store.getState())
})

const unsubscribe = store.subscribe(() => {
  console.log('The state has changed.')
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Learn React Native',
    complete: false
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Learn brewing',
    complete: false
  }
})

store.dispatch({
  type: TOOGLE_TODO,
  id: 0,
})

store.dispatch({
  type: REMOVE_TODO,
  id: 2,
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Finish React ND Course',
    complete: false
  }
})

