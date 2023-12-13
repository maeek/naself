import { ChangeEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import classNames from 'classnames';
import './select.scss';

export interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: ReactNode;
  label?: ReactNode;
  searchable?: boolean;
  description?: ReactNode;
  disabled?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  options: {
    value: string;
    label?: string;
    disabled?: boolean;
    group?: string;
  }[];
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ prefix, options, className, value, onChange, disabled, searchable, type = 'text', ...props }, ref) => {
    const optionsByGroup = options.reduce(
      (acc, option) => {
        if (option.group) {
          if (!acc[option.group]) {
            acc[option.group] = [];
          }
          acc[option.group].push(option);
        } else {
          acc[''] = acc[''] ?? [];
          acc[''].push(option);
        }
        return acc;
      },
      {} as Record<string, typeof options>
    );
    return (
      <div className='select__container'>
        <label
          aria-disabled={disabled}
          className={classNames(
            'select',
            {
              'select--disabled': disabled
            },
            className
          )}
        >
          {prefix ? <div className='select__prefix'>{prefix}</div> : null}
          <input
            {...props}
            type={type}
            readOnly={!searchable}
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            aria-disabled={disabled}
          />
          <button className='select__suffix'>
            <IconChevronDown />
          </button>
        </label>
        <div className='select__options'>
          {Object.entries(optionsByGroup).map(([group, subOptions]) => (
            <div
              className='select__group'
              key={group}
            >
              {group ? <div className='select__group_label'>{group}</div> : null}
              {subOptions.map(option => (
                <button
                  className={classNames('select__option', {
                    'select__option--disabled': option.disabled,
                    'select__option--selected': option.value === value
                  })}
                  disabled={option.disabled}
                  key={option.value}
                >
                  {option.label ?? option.value}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
