import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './fieldset.scss';

export interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  description?: string;
  children?: ReactNode;
  layout?: 'horizontal' | 'vertical';
  htmlFor?: string;
}

export const Fieldset = ({ title, description, children, layout = 'vertical', htmlFor }: FieldsetProps) => {
  const legendContent = (
    <>
      {title ? <legend className='fieldset__title'>{title}</legend> : null}
      {description ? <div className='fieldset__description'>{description}</div> : null}
    </>
  );

  return (
    <fieldset className={classNames('fieldset', `fieldset--${layout}`)}>
      <div className='fieldset__header'>
        {htmlFor ? <label htmlFor={htmlFor}>{legendContent}</label> : legendContent}
      </div>
      <div className='fieldset__content'>{children}</div>
    </fieldset>
  );
};
