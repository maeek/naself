import { render, screen } from '@testing-library/react';
import { Property, PropertyProps } from './property';

describe('Property', () => {
  const defaultProps: PropertyProps = {
    name: 'Test Property',
    children: <span>Test Value</span>
  };

  it('renders the property name and value', () => {
    render(<Property {...defaultProps} />);
    const nameElement = screen.getByText(defaultProps.name);
    const valueElement = screen.getByText('Test Value');

    expect(nameElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });
});
