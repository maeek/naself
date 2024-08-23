import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import './button.scss'

export interface ButtonProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'prefix'> {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline'
  prefix?: ReactNode
  suffix?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  prefix,
  suffix,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={classNames(
        'button',
        `button--${size}`,
        `button--${variant}`,
        { 'button--disabled': disabled },
        className
      )}
      type={props.type ?? 'button'}
    >
      {prefix ? <span className='button__prefix'>{prefix}</span> : null}
      <span className='button__content'>{children}</span>
      {suffix ? <span className='button__suffix'>{suffix}</span> : null}
    </button>
  )
}
