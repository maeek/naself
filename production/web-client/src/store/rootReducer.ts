import { combineReducers } from '@reduxjs/toolkit';
import { asyncService } from '@/services/async.service';
import { dialogsReducer } from './features/dialogs/dialogs-reducer';

export const rootReducer = () => ({
  [asyncService.reducerPath]: asyncService.reducer,
  UI: combineReducers({
    dialogs: dialogsReducer
  })
});
