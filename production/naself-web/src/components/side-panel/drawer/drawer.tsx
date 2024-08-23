'use client'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { BurgerButton } from '@/components/common/burger/burger'
import { Panel } from '../panel/panel'
import './drawer.scss'

interface DrawerProps {
  open?: boolean
  onClose: () => void
}

export const Drawer = ({ onClose, open }: DrawerProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const [animationDelay, setAnimationDelay] = useState(false)

  useEffect(() => {
    setInternalOpen(!!open)
    const animationTimeout = setTimeout(() => setAnimationDelay(!!open), 100)
    return () => clearTimeout(animationTimeout)
  }, [open])

  if (!open && !internalOpen && !animationDelay) {
    return null
  }

  return (
    <div className='drawer-container'>
      <div
        className={classNames('drawer-mask', { open: internalOpen })}
        onClick={onClose}
      />
      <Panel
        button={
          <BurgerButton
            open={open}
            onClick={onClose}
          />
        }
        className={internalOpen ? 'open' : ''}
      />
    </div>
  )
}
