import React from 'react'
import { connect } from 'react-redux'

import {
  asyncAddGoalAction,
  asyncRemoveGoalAction
} from '../actions/goals'
import List from './List'

class Goals extends React.Component {
  addItem = (event) => {
    event.preventDefault()

    const { dispatch } = this.props
    dispatch(asyncAddGoalAction(
      this.input.value,
      () => this.input.value = ''
      ))
  }

  removeItem = (goal) => {
    const { dispatch } = this.props
    dispatch(asyncRemoveGoalAction(goal))
  }

  render() {
    return (
      <div>
      <h1>Goals List</h1>
      <input
      type='text'
      placeholder='Add Goal'
      ref={(input) => this.input = input}
      />
      <button onClick={this.addItem}>Add Goal</button>

      <List items={this.props.goals} remove={this.removeItem} />
      </div>
      )
  }
}

export default connect((state) => ({
  goals: state.goals
}))(Goals)
