import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  test('renders button with default props', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('button--medium');
    expect(buttonElement).toHaveClass('button--primary');
  });

  test('renders button with custom props', () => {
    render(
      <Button
        size='large'
        variant='secondary'
        prefix={<span>Prefix</span>}
        suffix={<span>Suffix</span>}
      >
        Click me
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('button--large');
    expect(buttonElement).toHaveClass('button--secondary');
    expect(screen.getByText('Prefix')).toBeInTheDocument();
    expect(screen.getByText('Suffix')).toBeInTheDocument();
  });
});
