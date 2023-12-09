import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, CheckboxProps } from './checkbox';

describe('Checkbox', () => {
  const defaultProps: CheckboxProps = {
    checked: false,
    disabled: false,
    onChange: jest.fn()
  };

  it('renders the Checkbox component', () => {
    render(<Checkbox {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('renders the Checkbox component with prefix and suffix', () => {
    render(
      <Checkbox
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

  it('calls the onChange event handler when the checkbox is clicked', () => {
    render(<Checkbox {...defaultProps} />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('disables the checkbox when disabled prop is true', () => {
    render(
      <Checkbox
        {...defaultProps}
        disabled
      />
    );
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeDisabled();
  });

  it('renders the checkbox with the checked state', () => {
    render(
      <Checkbox
        {...defaultProps}
        checked
      />
    );
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeChecked();
  });
});
