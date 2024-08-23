import { ReactNode } from 'react'
import classNames from 'classnames'
import './spacer.scss'

export interface SpacerProps {
  size?: 'extra-small' | 'small' | 'medium' | 'large'
  type?: 'horizontal' | 'vertical'
  children?: ReactNode
  withDivider?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Spacer = ({
  size = 'medium',
  type = 'vertical',
  withDivider,
  className,
  children,
  style
}: SpacerProps) => {
  return (
    <div
      data-testid='spacer'
      className={classNames(
        'spacer',
        `spacer--${size}`,
        `spacer--${type}`,
        {
          'spacer--with-divider': withDivider
        },
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}
