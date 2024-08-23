'use client'
import { CSSProperties, useState } from 'react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import classNames from 'classnames'
import './item.scss'

interface ItemProps {
  item: {
    name: string
    icon: React.ReactNode
    activeColor?: string
    subitems?: {
      active?: boolean
      name: string
      link: string
    }[]
  }
}

export const Item = ({ item }: ItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <li className='panel-item'>
      <div
        className='panel-item__header'
        onClick={() => setIsCollapsed(p => !p)}
      >
        <div className='panel-item__header-name'>
          {item.icon}
          <span>{item.name}</span>
        </div>
        {item.subitems && (isCollapsed ? <IconChevronDown /> : <IconChevronUp />)}
      </div>
      {item.subitems && !isCollapsed ? (
        <div className='panel-item__sub'>
          <div className='panel-item__sub-indicator'></div>
          <ul className='panel-item__sub-list'>
            {item.subitems.map(subitem => (
              <li
                key={subitem.name}
                style={{ '--_color': item.activeColor } as CSSProperties}
                className={classNames('panel-item__sub-list-item', { active: subitem.active })}
              >
                {subitem.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </li>
  )
}
