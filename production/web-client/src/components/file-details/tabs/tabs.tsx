import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Spacer } from '@/components/common/spacer/spacer';
import './tabs.scss';

export interface PropertiesTabsProps {
  options: {
    name: string;
    children: ReactNode | (() => ReactNode);
  }[];
}

export const PropertiesTabs = ({ options }: PropertiesTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>();
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeTab && options.length > 0) {
      setActiveTab(options[0].name);
    }
  }, [activeTab, options]);

  useLayoutEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.getAnimations().forEach(animation => {
        animation.play();
      });
    }
  }, [activeTab]);

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
      <Spacer size='medium' />
      <div
        className='tabs__renderer'
        ref={rendererRef}
      >
        {typeof content === 'function' ? content() : content}
      </div>
    </div>
  );
};
