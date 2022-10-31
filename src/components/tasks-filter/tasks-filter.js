import React from 'react'
import './tasks-filter.css'
import PropTypes from 'prop-types'

class TasksFilter extends React.Component {
  static defaultProps = {
    showMode: 'all',
  }

  static propTypes = {
    showMode: PropTypes.string,
  }

  onChangeShowModeWithId = (e) => {
    this.props.onChangeShowMode(e.target.name)
  }

  render() {
    const { showMode } = this.props

    let buttonsData = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ]
    let btns = buttonsData.map(({ name, label }) => {
      let claz = showMode === name ? 'selected' : ''

      return (
        <li key={name}>
          <button className={claz} name={name} onClick={this.onChangeShowModeWithId}>
            {label}
          </button>
        </li>
      )
    })
    return <ul className="filters">{btns}</ul>
  }
}

export default TasksFilter
