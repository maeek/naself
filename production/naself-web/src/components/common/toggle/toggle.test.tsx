import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle, ToggleProps } from './toggle';

describe('Toggle', () => {
  const defaultProps: ToggleProps = {
    checked: false,
    disabled: false,
    onChange: jest.fn()
  };

  it('renders the Toggle component', () => {
    render(<Toggle {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('renders the Toggle component with prefix and suffix', () => {
    render(
      <Toggle
        {...defaultProps}
        prefix={<span>Prefix</span>}
        suffix={<span>Suffix</span>}
      />
    );
    const prefixElement = screen.getByText('Prefix');
    const suffixElement = screen.getByText('Suffix');
    expect(prefixElement).toBeInTheDocument();
    expect(suffixElement).toBeInTheDocument();
  });

  it('calls the onChange event handler when the toggle is clicked', () => {
    render(<Toggle {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('disables the toggle when disabled prop is true', () => {
    render(
      <Toggle
        {...defaultProps}
        disabled
      />
    );
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeDisabled();
  });

  it('renders the toggle with the checked state', () => {
    render(
      <Toggle
        {...defaultProps}
        checked
      />
    );
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked();
  });
});
