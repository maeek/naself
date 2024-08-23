import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import classNames from 'classnames'
import './text-input.scss'

type InvalidReason = string

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode
  suffix?: ReactNode
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  validate?: (value: string) => InvalidReason | false | undefined
  fitToContainer?: boolean
  style?: React.CSSProperties
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { prefix, suffix, className, validate, value, onChange, disabled, type = 'text', style, fitToContainer, ...props },
    ref
  ) => {
    const invalidCause = validate ? validate(value ?? '') : null
    const invalid = validate ? !!invalidCause : null

    return (
      <div
        style={style}
        className={classNames('input__container', { 'input__container--fit': fitToContainer })}
      >
        <label
          aria-disabled={disabled}
          className={classNames(
            'input',
            {
              'input--invalid': invalid ?? false,
              'input--disabled': disabled
            },
            className
          )}
        >
          {prefix ? <div className='input__prefix'>{prefix}</div> : null}
          <input
            {...props}
            type={type}
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-disabled={disabled}
          />
          {suffix ? <div className='input__suffix'>{suffix}</div> : null}
        </label>
        {invalid ? <div className='input__invalid'>{invalidCause}</div> : null}
      </div>
    )
  }
)
