import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, applyMiddleware } from 'redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import App from './components/app/app'
import reducer from './redux/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'))

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

// function loggerMiddleware(store) {
//   return function (next) {
//     return function (action) {
//       const result = next(action)
//       console.log('Middleware', store.getState())
//       return result
//     }
//   }
// }

// const loggerMiddleware = (store) => (next) => (action) => {
const loggerMiddleware = () => (next) => (action) => {
  const result = next(action)
  // console.log('Middleware', store.getState())
  return result
}

// const store = createStore(reducer, applyMiddleware(loggerMiddleware, reduxThunk))
const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
