import React from 'react';
import { setupWorker } from 'msw';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app';
import { handlers } from './mocks/handlers';
import { store } from './store';

if (process.env.NODE_ENV === 'development') {
  const worker = setupWorker(...handlers);
  void worker.start();
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
