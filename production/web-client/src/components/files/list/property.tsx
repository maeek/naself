import { ReactNode } from 'react';
import './property.scss';

export interface PropertyProps {
  name: string;
  children: ReactNode;
}

export const Property = ({ name, children }: PropertyProps) => (
  <div className='property'>
    <div className='property__name'>{name}</div>
    <div className='property__value'>{children}</div>
  </div>
);
