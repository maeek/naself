import { render, screen } from '@testing-library/react';
import { PropertyList } from './properties-list';

describe('PropertyList', () => {
  it('renders the title correctly', () => {
    const title = 'Test Title';
    render(<PropertyList title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the children correctly', () => {
    const children = (
      <>
        <li>Child 1</li>
        <li>Child 2</li>
      </>
    );
    render(<PropertyList>{children}</PropertyList>);

    const child1Element = screen.getByText('Child 1');
    const child2Element = screen.getByText('Child 2');
    expect(child1Element).toBeInTheDocument();
    expect(child2Element).toBeInTheDocument();
  });
});
