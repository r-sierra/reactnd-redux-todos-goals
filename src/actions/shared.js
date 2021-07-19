import API from 'goals-todos-api'

const RECEIVE_DATA = 'RECEIVE_DATA'

function receiveDataAction(todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals,
  }
}

export function asyncReceiveDataAction() {
  return (dispatch) => {
    return Promise.all([API.fetchTodos(), API.fetchGoals()])
    .then(([todos, goals]) => {
      dispatch(receiveDataAction(todos, goals))
    })
  }
}
