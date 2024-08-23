import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import classNames from 'classnames'
import { useFieldSetContext } from '../fieldset/fieldset-context'
import './toggle.scss'

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type'> {
  prefix?: ReactNode
  suffix?: ReactNode
  label?: ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ prefix, suffix, className, checked, onChange, disabled, name, ...props }, ref) => {
    const { disabled: disabledByContext, onChange: onChangeByContext, name: nameByContext } = useFieldSetContext()
    const isDisabled = disabled ?? disabledByContext ?? false

    return (
      <div className='toggle__container'>
        <label
          aria-disabled={isDisabled}
          className={classNames(
            'toggle',
            {
              'toggle--disabled': isDisabled
            },
            className
          )}
        >
          {prefix ? <div className='toggle__prefix'>{prefix}</div> : null}
          <input
            {...props}
            name={name ?? nameByContext}
            onChange={e => {
              onChange?.(e)
              onChangeByContext?.(e)
            }}
            type='checkbox'
            ref={ref}
            checked={checked}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          />
          <div className='toggle__switch'>
            <div className='toggle__switch__knob' />
          </div>
          {suffix ? <div className='toggle__suffix'>{suffix}</div> : null}
        </label>
      </div>
    )
  }
)
