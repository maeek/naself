import { combineReducers } from '@reduxjs/toolkit';
import { asyncService } from '@/services/async.service';
import { dialogsReducer } from './slices/dialogs/dialogs-reducer';

export const rootReducer = combineReducers({
  [asyncService.reducerPath]: asyncService.reducer,
  ui: combineReducers({
    dialogs: dialogsReducer
  })
});
