import { Middleware, autoBatchEnhancer, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { asyncService } from '@/services/async.service';

export type RootState = ReturnType<typeof rootReducer>;

const rtkQueryErrorHandler: Middleware<null, RootState, AppDispatch> = _api => next => action => {
  if (isRejectedWithValue(action)) {
    // Dispatch error
    // api.dispatch();
    console.error(action);
  }

  return next(action);
};

export const createStore = (initialState?: RootState) => {
  const middlewares: Middleware[] = [asyncService.middleware, rtkQueryErrorHandler];

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(autoBatchEnhancer({ type: 'tick' }))
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
