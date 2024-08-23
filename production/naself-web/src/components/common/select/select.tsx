import { ReactNode, forwardRef } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from 'classnames'
import './select.scss'

export interface SelectProps {
  prefix?: ReactNode
  label?: ReactNode
  className?: string
  searchable?: boolean
  description?: ReactNode
  disabled?: boolean
  value?: string
  onChange?: (value: unknown) => void
  options: {
    value: string
    label?: string
    disabled?: boolean
    group?: string
  }[]
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ prefix, options, className, value, onChange, disabled, searchable, ...props }, ref) => {
    const optionsByGroup = options.reduce(
      (acc, option) => {
        if (option.group) {
          if (!acc[option.group]) {
            acc[option.group] = []
          }
          acc[option.group].push(option)
        } else {
          acc[''] = acc[''] ?? []
          acc[''].push(option)
        }
        return acc
      },
      {} as Record<string, typeof options>
    )

    return (
      <div
        className='select__container'
        ref={ref}
      >
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
            type='text'
            readOnly={!searchable}
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
                  key={group + option.value}
                  onClick={e => {
                    if (option.disabled) {
                      e.preventDefault()
                      return
                    }
                    onChange?.(option.value)
                    e.currentTarget.blur()
                  }}
                >
                  {option.label ?? option.value}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
)
