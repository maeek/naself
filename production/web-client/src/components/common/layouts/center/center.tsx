import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './center.scss';

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'column';
}

export const Center = ({ children, className, ...rest }: CenterProps) => {
  return (
    <div
      className={classNames('center', `center--${rest.direction ?? 'row'}`, className)}
      {...rest}
    >
      {children}
    </div>
  );
};
