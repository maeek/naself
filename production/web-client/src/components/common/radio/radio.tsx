import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import classNames from 'classnames';
import { useFieldSetContext } from '../fieldset/fieldset-context';
import './radio.scss';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type'> {
  prefix?: ReactNode;
  label?: ReactNode;
  /**
   * Only visible when label is provided
   */
  description?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ prefix, label, className, checked, onChange, disabled, name, description, ...props }, ref) => {
    const { disabled: disabledByContext, onChange: onChangeByContext, name: nameByContext } = useFieldSetContext();
    const isDisabled = disabled ?? disabledByContext ?? false;

    return (
      <div className='radio__container'>
        <label
          aria-disabled={isDisabled}
          className={classNames(
            'radio',
            {
              'radio--disabled': disabled
            },
            className
          )}
        >
          {prefix ? <div className='radio__prefix'>{prefix}</div> : null}
          <input
            {...props}
            name={name ?? nameByContext}
            type='radio'
            ref={ref}
            checked={checked}
            onChange={e => {
              onChange?.(e);
              onChangeByContext?.(e);
            }}
            disabled={isDisabled}
            aria-disabled={isDisabled}
          />
          <div className='radio__switch'>
            <div className='radio__switch__knob' />
          </div>
          {label ? (
            <div className='radio__rich-label'>
              <div className='radio__rich-label__label'>{label}</div>
              <p className='radio__rich-label__description'>{description}</p>
            </div>
          ) : null}
        </label>
      </div>
    );
  }
);
