import { ReactNode, useEffect, useState } from 'react';
import './tabs.scss';

export interface PropertiesTabsProps {
  options: {
    name: string;
    children: ReactNode;
  }[];
}

export const PropertiesTabs = ({ options }: PropertiesTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    if (!activeTab && options.length > 0) {
      setActiveTab(options[0].name);
    }
  }, [activeTab, options]);

  const content = options.find(option => option.name === activeTab)?.children ?? options[0].children;

  return (
    <div className='properties__tabs'>
      <div className='tabs__switcher'>
        {options.map(option => (
          <button
            className='tabs__tab'
            data-selected={option.name === activeTab}
            key={option.name}
            onClick={() => setActiveTab(option.name)}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className='tabs__divider' />
      <div className='tabs__renderer'>{content}</div>
    </div>
  );
};
