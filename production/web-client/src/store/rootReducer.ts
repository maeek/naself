import { combineReducers } from '@reduxjs/toolkit';
import { dialogsReducer } from './features/dialogs/dialogs-reducer';
import { asyncService } from '@/services/async.service';

export const rootReducer = () => ({
  [asyncService.reducerPath]: asyncService.reducer,
  UI: combineReducers({
    dialogs: dialogsReducer
  })
});
