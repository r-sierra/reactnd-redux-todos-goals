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
    getStore,
    subscribe,
    dispatch
  }
}

// App Code

function todos(state = [], action) {
  // reducer function
  if (action.type == 'ADD_TODO') {
    return state.concat([action.todo])
  }
  return state
}

let store = createStore(todos)
store.subscribe(() => {
  console.log('The new state is ', store.getState())
})

const unsubscribe = store.subscribe(() => {
  console.log('The state has changed.')
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    done: false
  }
})
