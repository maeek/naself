import { render, screen } from '@testing-library/react';
import { Spacer, SpacerProps } from './spacer';

describe('Spacer', () => {
  test('renders with default props', () => {
    render(<Spacer />);
    const spacerElement = screen.getByTestId('spacer');

    expect(spacerElement).toBeInTheDocument();
    expect(spacerElement).toHaveClass('spacer');
    expect(spacerElement).toHaveClass('spacer--medium');
    expect(spacerElement).toHaveClass('spacer--vertical');
  });

  test('renders with custom props', () => {
    const customProps: SpacerProps = {
      size: 'small',
      type: 'horizontal',
      className: 'custom-class'
    };

    render(<Spacer {...customProps} />);
    const spacerElement = screen.getByTestId('spacer');

    expect(spacerElement).toBeInTheDocument();
    expect(spacerElement).toHaveClass('spacer');
    expect(spacerElement).toHaveClass('spacer--small');
    expect(spacerElement).toHaveClass('spacer--horizontal');
    expect(spacerElement).toHaveClass('custom-class');
  });
});
