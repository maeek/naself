'use client'
import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef, useEffect, useState } from 'react'
import { IconCheck } from '@tabler/icons-react'
import classNames from 'classnames'
import { useFieldSetContext } from '../fieldset/fieldset-context'
import './checkbox.scss'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type'> {
  prefix?: ReactNode
  label?: ReactNode
  /**
   * Only visible when label is provided
   */
  description?: ReactNode
  checked?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, shift?: boolean) => void
  style?: React.CSSProperties
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ prefix, label, className, checked, onChange, disabled, name, description, style, ...props }, ref) => {
    const { disabled: disabledByContext, onChange: onChangeByContext, name: nameByContext } = useFieldSetContext()
    const isDisabled = disabled ?? disabledByContext ?? false

    const [isShiftPressed, setIsShiftPressed] = useState(false)

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
          console.log('shift pressed')
          setIsShiftPressed(true)
        }
      }

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
          setIsShiftPressed(false)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
      }
    }, [])

    return (
      <div
        className='checkbox__container'
        style={style}
      >
        <label
          aria-disabled={isDisabled}
          className={classNames(
            'checkbox',
            {
              'checkbox--disabled': disabled
            },
            className
          )}
        >
          {prefix ? <div className='checkbox__prefix'>{prefix}</div> : null}
          <input
            {...props}
            name={name ?? nameByContext}
            type='checkbox'
            ref={ref}
            checked={checked}
            onChange={e => {
              onChange?.(e, isShiftPressed)
              onChangeByContext?.(e)
            }}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          />
          <div className='checkbox__switch'>
            <div className='checkbox__switch__knob'>
              <IconCheck strokeWidth={4} />
            </div>
          </div>
          {label ? (
            <div className='checkbox__rich-label'>
              <div className='checkbox__rich-label__label'>{label}</div>
              {description ? <p className='checkbox__rich-label__description'>{description}</p> : null}
            </div>
          ) : null}
        </label>
      </div>
    )
  }
)
