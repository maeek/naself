import { App } from './app';
import { renderWithStore } from './setup-tests';

describe('App', () => {
  it('should render', () => {
    expect(() => renderWithStore(<App />)).not.toThrow();
  });
});
