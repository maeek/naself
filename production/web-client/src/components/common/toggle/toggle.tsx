import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import './toggle.scss';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type'> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ prefix, suffix, className, checked, onChange, disabled, ...props }, ref) => {
    return (
      <div className='toggle__container'>
        <label
          aria-disabled={disabled}
          className={classNames(
            'toggle',
            {
              'toggle--disabled': disabled
            },
            className
          )}
        >
          {prefix ? <div className='toggle__prefix'>{prefix}</div> : null}
          <input
            {...props}
            type='checkbox'
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-disabled={disabled}
          />
          <div className='toggle__switch'>
            <div className='toggle__switch__knob' />
          </div>
          {suffix ? <div className='toggle__suffix'>{suffix}</div> : null}
        </label>
      </div>
    );
  }
);
