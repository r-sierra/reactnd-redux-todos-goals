import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOOGLE_TODO = 'TOOGLE_TODO'

// Action creators
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toogleTodoAction(id) {
  return {
    type: TOOGLE_TODO,
    id,
  }
}

export function asyncRemoveTodoAction(todo) {
  return (dispatch) => {
    dispatch(removeTodoAction(todo.id))

    return API.deleteTodo(todo.id)
    .catch(() => {
      dispatch(addTodoAction(todo))
      alert('An error ocurred. Try again.')
    })
  }
}

export function asyncAddTodoAction(name, callback) {
  return (dispatch) => {
    return API.saveTodo(name)
    .then((todo) => {
      dispatch(addTodoAction(todo))
      callback()
    })
    .catch(() => {
      alert('Ann error ocurred. Try again.')
    })
  }
}

export function asyncToggleTodoAction(todo) {
  return (dispatch) => {
    dispatch(toogleTodoAction(todo.id))

    return API.saveTodoToggle(todo.id)
    .catch(() => {
      dispatch(toogleTodoAction(todo.id))
      alert('An error ocurred. Try again.')
    })
  }
}
