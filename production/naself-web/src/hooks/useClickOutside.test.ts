import { renderHook } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  test('should call the handler when clicking outside the ref element', () => {
    const handler = jest.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useClickOutside(handler, ref));

    const clickEvent = new MouseEvent('mousedown', { bubbles: true });
    document.dispatchEvent(clickEvent);

    expect(handler).toHaveBeenCalled();
  });

  test('should not call the handler when clicking inside the ref element', () => {
    const handler = jest.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useClickOutside(handler, ref));

    const clickEvent = new MouseEvent('mousedown', { bubbles: true });
    ref.current.dispatchEvent(clickEvent);

    expect(handler).not.toHaveBeenCalled();
  });
});
