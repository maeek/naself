import { combineReducers } from '@reduxjs/toolkit'
import { dialogsReducer } from './slices/dialogs/dialogs-reducer'

export const rootReducer = combineReducers({
  ui: combineReducers({
    dialogs: dialogsReducer
  })
})
