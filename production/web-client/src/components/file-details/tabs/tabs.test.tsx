import { render, screen, fireEvent } from '@testing-library/react';
import { PropertiesTabs, PropertiesTabsProps } from './tabs';

describe('PropertiesTabs', () => {
  const options: PropertiesTabsProps['options'] = [
    {
      name: 'Tab 1',
      children: 'Content 1'
    },
    {
      name: 'Tab 2',
      children: 'Content 2'
    }
  ];

  it('renders the tabs with correct options', () => {
    render(<PropertiesTabs options={options} />);

    const tabButtons = screen.getAllByRole('button');
    expect(tabButtons).toHaveLength(options.length);

    options.forEach((option, index) => {
      expect(tabButtons[index]).toHaveTextContent(option.name);
    });
  });

  it('renders the default content when no tab is selected', () => {
    render(<PropertiesTabs options={options} />);

    const defaultContent = screen.getByText('Content 1');
    expect(defaultContent).toBeInTheDocument();
  });

  it('renders the selected tab content when a tab is clicked', () => {
    render(<PropertiesTabs options={options} />);

    fireEvent.click(screen.getAllByRole('button')[1]);

    const selectedContent = screen.getByText('Content 2');
    expect(selectedContent).toBeInTheDocument();
  });
});
