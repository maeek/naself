'use client'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import './burger-button.scss'

interface BurgerButtonProps {
  onClick?: () => void
  className?: string
  open?: boolean
}

export const BurgerButton = ({ onClick, className, open = false }: BurgerButtonProps) => {
  const [internalOpen, setInternalOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setInternalOpen(open), 10)
    return () => clearTimeout(timeout)
  }, [open])

  return (
    <button
      className={classNames('burger-button', className)}
      onClick={onClick}
    >
      <div className={classNames('burger-icon burger-icon-1', { open: internalOpen })}></div>
      <div className={classNames('burger-icon burger-icon-2', { open: internalOpen })}></div>
      <div className={classNames('burger-icon burger-icon-3', { open: internalOpen })}></div>
    </button>
  )
}
