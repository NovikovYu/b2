import { combineReducers } from 'redux'

import messageReducer from './messageReducer'
import userReducer from './userReducer'
import articlesReducer from './articlesReducer'

const rootReducer = combineReducers({ messageReducer, userReducer, articlesReducer })

export default rootReducer
