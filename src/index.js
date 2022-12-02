import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
// import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/app/app'
// import reducer from './redux/reducer'
import rootReducer from './redux/rootReducer'

// настраиваем персист
const persistConfig = {
  key: 'root',
  storage: storage,
}

// создаём персестированный редьюсер (ПОМЕНЯТЬ РЕДЬЮСЕР НА КОРНЕВОЙ)
// const persistedReduser = persistReducer(persistConfig, reducer)
const persistedReduser = persistReducer(persistConfig, rootReducer)

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const loggerMiddleware = () => (next) => (action) => {
  const result = next(action)
  return result
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore(persistedReduser, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)))
// const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMiddleware, reduxThunk)))

// делаем новый стор
const persistor = persistStore(store)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
