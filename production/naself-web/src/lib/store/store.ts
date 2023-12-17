import { autoBatchEnhancer, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (initialState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(autoBatchEnhancer({ type: 'tick' }))
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
