import React from 'react'
import './task.css'
import PropTypes from 'prop-types'

class Task extends React.Component {
  static defaultProps = {
    data: [],
    onDelete: () => {},
    onDo: () => {},
  }

  static propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onDo: PropTypes.func,
  }

  state = {
    timer: this.props.data.time,
    timerNum: '',
  }

  startTimer = () => {
    if (!this.state.timerNum) {
      console.log('start')
      let timerId = setInterval(this.decreaseTimer, 1000)
      this.setState(() => {
        return { timerNum: timerId }
      })
    }
  }

  stopTimer = () => {
    if (this.state.timerNum) {
      console.log('stop')
      clearInterval(this.state.timerNum)
      this.setState(() => {
        return { timerNum: '' }
      })
    }
  }

  decreaseTimer = () => {
    console.log(this.state.timerNum)
    console.log(this.state.timer)
    this.setState(({ timer }) => {
      if (timer > 0) {
        return { timer: timer - 1 }
      }
    })
  }

  render() {
    const { data, onDelete, onDo } = this.props

    let classes = data.liClassName

    if (data.done) {
      classes += ' completed'
    }

    return (
      <li className={classes}>
        <div className="view">
          {/* <input className="toggle" type="checkbox"></input> */}
          <label>
            {/* <span className="description" onClick={onDo}>
              {data.description}
            </span>
            <span className="created"> {data.created}</span> */}
            <span className="title" onClick={onDo}>
              {data.description}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={() => this.startTimer()}></button>
              <button className="icon icon-pause" onClick={() => this.stopTimer()}></button>
              {/* <span className="timer-time-span">{this.state.timer}</span> */}
              <span className="timer-time-span">
                <span>{Math.floor(this.state.timer / 60)}</span>
                <span> : </span>
                <span>{this.state.timer - Math.floor(this.state.timer / 60) * 60}</span>
              </span>
            </span>
            <span className="description">{data.created}</span>
          </label>

          {/* <label>
                <span class="title">fw</span>
                <span class="description">
                  <button class="icon icon-play"></button>
                  <button class="icon icon-pause"></button>
                  12:25
                </span>
                <span class="description">created 17 seconds ago</span>
              </label> */}

          <button className="icon icon-edit"></button>

          <button className="icon icon-destroy" onClick={onDelete}></button>

          {/* <div className="timer-wrapper">
            <span className="timer-time">{this.state.timer}</span>
            <button className="timer-start-btn btn" onClick={() => this.startTimer()}>
              start
            </button>
            <button className="timer-start-btn btn" onClick={() => this.stopTimer()}>
              pause
            </button>
          </div> */}
        </div>

        {/* есть только в editing */}
        {/* <input type="text" class="edit" value="Editing task"> */}
      </li>
    )
  }
}

export default Task
