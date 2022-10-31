import React from 'react'
import './new-task-form.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  static defaultProps = {
    addTask: () => {},
  }

  static propTypes = {
    addTask: PropTypes.func,
  }

  state = {
    taskName: '',
  }

  onChange = (e) => {
    this.setState(() => {
      return {
        taskName: e.target.value,
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { addTask } = this.props

    if (this.state.taskName) {
      addTask(this.state.taskName)

      this.setState(() => {
        return {
          taskName: '',
        }
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          onChange={this.onChange}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.taskName}
        ></input>

        <button className="new-todo-btn">Add task</button>
      </form>
    )
  }
}

export default NewTaskForm
