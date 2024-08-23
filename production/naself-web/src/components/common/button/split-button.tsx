import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler, ReactNode } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from 'classnames'
import './split-button.scss'

export interface SplitButtonProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'prefix' | 'children'> {
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  prefix?: ReactNode
  suffix?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  optionsPosition?: 'left' | 'right' | 'bottom'
  options: {
    name: string
    description?: string
    /**
     * if children are provided, description and name is ignored,
     * the name is still neded to be used as key
     */
    children?: ReactNode
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
  }[]
}

export const SplitButton = ({
  size = 'small',
  prefix,
  suffix,
  className,
  variant = 'primary',
  options,
  optionsPosition = 'right',
  disabled,
  onClick,
  ...props
}: SplitButtonProps) => {
  return (
    <div className='split-button__container'>
      <button
        {...props}
        disabled={disabled || options[0]?.disabled}
        aria-disabled={disabled || options[0]?.disabled}
        onClick={!disabled && !options[0]?.disabled ? onClick : undefined}
        className={classNames(
          'split-button',
          `split-button--${variant}`,
          `split-button--${size}`,
          { 'split-button--disabled': disabled || options[0]?.disabled },
          className
        )}
        type='button'
      >
        {prefix ? <span className='split-button__prefix'>{prefix}</span> : null}
        <span className='split-button__content'>{options[0].name}</span>
        {suffix ? <span className='split-button__suffix'>{suffix}</span> : null}
      </button>
      <div
        className='split-button__arrow'
        tabIndex={0}
      >
        <IconChevronDown />
        <ul className={classNames('split-button__options', `split-button__options--${optionsPosition}`)}>
          {options.slice(1).map(opt => (
            <li
              key={`split-${opt.name}`}
              className='split-button__options__item'
            >
              <button disabled={opt.disabled}>
                {opt.children ? (
                  opt.children
                ) : (
                  <>
                    <span>{opt.name}</span>
                    {opt.description ? (
                      <p className='split-button__options__item__description'>{opt.description}</p>
                    ) : null}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
