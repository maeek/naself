import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import './checkbox.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type'> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ prefix, suffix, className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <div className='checkbox__container'>
        <label
          aria-disabled={disabled}
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
            type='checkbox'
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-disabled={disabled}
          />
          <div className='checkbox__switch'>
            <div className='checkbox__switch__knob' />
          </div>
          {suffix ? <div className='checkbox__suffix'>{suffix}</div> : null}
        </label>
      </div>
    );
  }
);
