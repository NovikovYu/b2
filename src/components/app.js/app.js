import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './app.css'

var defaultTimeStamp = formatDistanceToNow(new Date(2022, 10, 2))

// var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')

class App extends React.Component {
  startId = 1000

  state = {
    toDoItems: [this.createEl('Deal 1'), this.createEl('Deal 2'), this.createEl('Deal 3'), this.createEl('Deal 4')],
    showMode: 'all', // all, active, complited
  }

  createEl(description, date = defaultTimeStamp, time = 150) {
    return {
      liClassName: '',
      description: description,
      created: `created ${date} ago`,
      done: false,
      id: this.startId++,
      time: time,
    }
  }

  deleteItem = (id) => {
    let deadIndex = this.state.toDoItems.findIndex((el) => el.id === id)

    let before = this.state.toDoItems.slice(0, deadIndex)
    let after = this.state.toDoItems.slice(deadIndex + 1)

    let newArr = [...before, ...after]

    this.setState((state) => {
      return (state.toDoItems = newArr)
    })
  }

  addTask = (text, time) => {
    this.setState(({ toDoItems }) => {
      var timeStamp = formatDistanceToNow(new Date())

      return {
        toDoItems: [...toDoItems, this.createEl(text, timeStamp, time)],
      }
    })
  }

  onDo = (id) => {
    this.setState(({ toDoItems }) => {
      let idx = toDoItems.findIndex((el) => el.id === id)

      let newEl = { ...toDoItems[idx] }

      newEl.done = !newEl.done

      let newArray = [...toDoItems.slice(0, idx), newEl, ...toDoItems.slice(idx + 1)]

      return {
        toDoItems: newArray,
      }
    })
  }

  onClearCompleted = () => {
    this.setState(({ toDoItems }) => {
      let newArray = toDoItems.filter((el) => el.done === false)

      return {
        toDoItems: newArray,
      }
    })
  }

  filter = (arr, showMode) => {
    switch (showMode) {
      case 'all':
        return arr
      case 'active':
        return arr.filter((el) => el.done === false)
      case 'completed':
        return arr.filter((el) => el.done === true)
      default:
        return arr
    }
  }

  onChangeShowMode = (showMode) => {
    this.setState({ showMode })
  }

  render() {
    const { toDoItems, showMode } = this.state
    const itemsLeftCounter = toDoItems.filter((el) => el.done === false).length

    // что из списка задач показываем?
    const filtredArr = this.filter(toDoItems, showMode)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList todos={filtredArr} onDo={this.onDo} onDelete={this.deleteItem} />

          <Footer
            todos={filtredArr}
            itemsLeftCounter={itemsLeftCounter}
            showMode={showMode}
            onChangeShowMode={this.onChangeShowMode}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    )
  }
}

// function App() {

// }

export default App
