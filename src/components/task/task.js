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

  render() {
    const { data, onDelete, onDo } = this.props

    let classes = data.liClassName

    if (data.done) {
      classes += ' completed'
    }

    return (
      <li className={classes}>
        <div className="view">
          {/* <input class="toggle" type="checkbox"> */}
          <label>
            <span className="description" onClick={onDo}>
              {data.description}
            </span>
            <span className="created"> {data.created}</span>
          </label>

          <button className="icon icon-edit"></button>

          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>

        {/* есть только в editing */}
        {/* <input type="text" class="edit" value="Editing task"> */}
      </li>
    )
  }
}

export default Task
