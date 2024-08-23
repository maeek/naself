import React, { HTMLAttributes } from 'react'
import classNames from 'classnames'
import './heading.scss'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  overflow?: 'ellipsis' | 'wrap'
}

export const Heading = ({ level = 1, className, overflow, ...rest }: HeadingProps) => {
  return React.createElement(`h${level}`, {
    className: classNames('heading', `heading--h${level}`, overflow ? `heading--overflow-${overflow}` : '', className),
    ...rest
  })
}
