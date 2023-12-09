import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('renders without errors', () => {
    render(<Input />);
  });

  it('renders with prefix and suffix', () => {
    render(
      <Input
        prefix={<span>Prefix</span>}
        suffix={<span>Suffix</span>}
      />
    );

    expect(screen.getByText('Prefix')).toBeInTheDocument();
    expect(screen.getByText('Suffix')).toBeInTheDocument();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables input when disabled prop is true', () => {
    const handleChange = jest.fn();
    render(
      <Input
        disabled
        onChange={handleChange}
      />
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays invalid message when validate prop returns a reason', () => {
    render(
      <Input
        value='Invalid'
        validate={value => (value === 'Invalid' ? 'Reason for invalid value' : false)}
      />
    );

    expect(screen.getByText('Reason for invalid value')).toBeInTheDocument();
  });
});
