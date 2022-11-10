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
    taskTime: '',
    taskMin: '',
    taskSec: '',
  }

  onChange = (e) => {
    if (e.target.name === 'min') {
      this.setState(() => {
        return {
          taskMin: e.target.value,
        }
      })
    } else if (e.target.name === 'sec') {
      this.setState(() => {
        return {
          taskSec: e.target.value,
        }
      })
    } else {
      this.setState(() => {
        return {
          taskName: e.target.value,
        }
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { addTask } = this.props

    if (this.state.taskName && this.state.taskSec) {
      let totalTime = parseInt(this.state.taskMin * 60) + parseInt(this.state.taskSec)
      addTask(this.state.taskName, totalTime)

      this.setState(() => {
        return {
          taskName: '',
          taskMin: '',
          taskSec: '',
        }
      })
    }
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          onChange={this.onChange}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.taskName}
        ></input>
        {/* <input
          className="new-todo"
          onChange={this.onChange}
          placeholder="How many time it will take?"
          autoFocus
          type="number"
          value={this.state.taskTime}
          name="time"
        ></input> */}
        {/* <input className="new-todo-form__timer" placeholder="Min" autoFocus></input> */}
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onChange}
          type="number"
          value={this.state.taskMin}
          name="min"
          step="1"
          min="0"
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={this.onChange}
          type="number"
          value={this.state.taskSec}
          name="sec"
          step="1"
          min="1"
          max="59"
        ></input>
        <button className="new-todo-btn">Add task</button>
      </form>
    )
  }
}

export default NewTaskForm
