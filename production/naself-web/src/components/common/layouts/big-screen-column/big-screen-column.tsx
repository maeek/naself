import { HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import './big-screen-column.scss'

export interface BigScreenColumnProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const BigScreenColumn = ({ children, className, ...rest }: BigScreenColumnProps) => {
  return (
    <div
      className={classNames('big-screen-column', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
