'use client';

import { useEffect } from 'react';
import { setupWorker } from 'msw';
import { handlers } from '@/mocks/handlers';

export const MSWInit = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const worker = setupWorker(...handlers);
      void worker.start();
    }
  }, []);

  return null;
};
