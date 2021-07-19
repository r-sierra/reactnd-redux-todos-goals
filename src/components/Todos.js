import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  asyncAddTodoAction,
  asyncRemoveTodoAction,
  asyncToggleTodoAction
} from '../actions/todos'
import List from './List'

class Todos extends Component {
  addItem = (event) => {
    event.preventDefault()

    const { dispatch } = this.props
    dispatch(asyncAddTodoAction(
        this.input.value,
        () => this.input.value = ''
    ))
  }

  removeItem = (todo) => {
    const { dispatch } = this.props
    dispatch(asyncRemoveTodoAction(todo))
  }

  toggleItem = (todo) => {
    const { dispatch } = this.props
    dispatch(asyncToggleTodoAction(todo))
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type='text'
          placeholder='Add Todo'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>

        <List
          items={this.props.todos}
          remove={this.removeItem}
          toggle={this.toggleItem}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.todos
}))(Todos)
