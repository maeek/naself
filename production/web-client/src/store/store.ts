import { Middleware, autoBatchEnhancer, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { asyncService } from '@/services/async.service';
import { rootReducer } from './rootReducer';

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

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<RootState>();
