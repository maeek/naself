import { ChangeEventHandler, Children, HTMLAttributes, ReactElement, ReactNode, cloneElement } from 'react'
import classNames from 'classnames'
import { Spacer, SpacerProps } from '../spacer'
import { FieldsetContextProvider } from './fieldset-context'
import './fieldset.scss'

export interface FieldsetProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  title?: string
  description?: string
  children?: ReactNode
  layout?: 'horizontal' | 'vertical'
  htmlFor?: string
  disabled?: boolean
  name?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  box?: boolean
}

export const Fieldset = ({
  title,
  description,
  children,
  layout = 'vertical',
  htmlFor,
  name,
  onChange,
  box,
  disabled
}: FieldsetProps) => {
  const legendContent = (
    <>
      {title ? <legend className='fieldset__title'>{title}</legend> : null}
      {description ? <div className='fieldset__description'>{description}</div> : null}
    </>
  )

  return (
    <FieldsetContextProvider value={{ disabled, onChange, name }}>
      <fieldset className={classNames('fieldset', `fieldset--${layout}`, { 'fieldset--box': box })}>
        {title ? (
          <div className='fieldset__header'>
            {htmlFor ? <label htmlFor={htmlFor}>{legendContent}</label> : legendContent}
          </div>
        ) : null}
        <div className='fieldset__content'>
          {Children.map(children, child => {
            // check if child exist and if it is a spacer
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            if (!child || (child as any).type !== Spacer) {
              return child
            }

            const typedChild = child as ReactElement<SpacerProps>

            return cloneElement(typedChild, {
              ...typedChild.props,
              withDivider: box,
              type: layout
            })
          })}
        </div>
      </fieldset>
    </FieldsetContextProvider>
  )
}
