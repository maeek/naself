import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import classNames from 'classnames';
import './button.scss';

export interface ButtonProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'prefix'> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline';
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  prefix,
  suffix,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames('button', `button--${size}`, `button--${variant}`, className)}
      type={props.type ?? 'button'}
    >
      {prefix ? <span className='button__prefix'>{prefix}</span> : null}
      <span className='button__content'>{children}</span>
      {suffix ? <span className='button__suffix'>{suffix}</span> : null}
    </button>
  );
};
