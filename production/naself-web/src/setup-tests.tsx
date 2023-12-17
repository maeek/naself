/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement, ReactNode } from 'react';
import { Store } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import 'whatwg-fetch';
import { RootState, createStore } from '@/lib/store';

type RenderWithStoreOptions = Omit<RenderOptions, 'queries'> & {
  store?: Store;
  wrappers?: ReactElement[];
  initialState?: unknown;
};

export const renderWithStore = (ui: ReactElement, options?: RenderWithStoreOptions) => {
  const store = options?.initialState ? createStore(options.initialState as RootState) : createStore();
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
  const wrapper = (props: any) => (
    <Provider
      store={store}
      {...props}
    >
      {options?.wrappers?.reduceRight(
        (acc, curr) => React.cloneElement(curr, { children: acc }),
        props.children as ReactNode
      ) || props.children}
    </Provider>
  );
  /* eslint-enable */

  return render(ui, { wrapper, ...options });
};

Object.defineProperty(window, 'location', {
  configurable: true,
  enumerable: true,
  value: new URL('https://localhost:3000/')
});

global.Element.prototype.getAnimations = function () {
  return [];
};
