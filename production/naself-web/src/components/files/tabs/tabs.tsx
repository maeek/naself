import { HTMLAttributes, ReactNode, useEffect, useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Spacer } from '@/components/common/spacer/spacer'
import './tabs.scss'

export interface PropertiesTabsProps extends HTMLAttributes<HTMLDivElement> {
  activeTab?: string | null
  onTabChange?: (tab: string) => void
  options: {
    name: string
    label?: string
    children: ReactNode | (() => ReactNode)
  }[]
}

export const PropertiesTabs = ({ options, activeTab: controlledTab, onTabChange, ...rest }: PropertiesTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(controlledTab || '')
  const [, startTransition] = useTransition()
  const rendererRef = useRef<HTMLDivElement>(null)
  const optionsRefs = useRef<HTMLButtonElement[]>([])

  useEffect(() => {
    if (controlledTab) {
      setActiveTab(controlledTab)
    }
  }, [controlledTab])

  useEffect(() => {
    if (!activeTab && options.length > 0 && !controlledTab) {
      startTransition(() => {
        setActiveTab(options[0].name)
      })
    }
  }, [controlledTab, activeTab, options])

  useLayoutEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.getAnimations().forEach(animation => {
        animation.play()
      })
    }
  }, [activeTab])

  const content = options.find(option => option.name === activeTab)?.children ?? options[0].children

  return (
    <div
      className='properties__tabs'
      {...rest}
    >
      <div className='tabs__switcher'>
        {options.map((option, i) => (
          <button
            ref={node => {
              if (node) {
                optionsRefs.current[i] = node
              }
            }}
            className='tabs__tab'
            data-selected={option.name === activeTab}
            key={option.name}
            onClick={() =>
              startTransition(() => {
                if (onTabChange) onTabChange?.(option.name)
                else setActiveTab(option.name)
              })
            }
            onKeyUp={e => {
              if (e.key === 'ArrowLeft') {
                const index = i === 0 ? options.length - 1 : i - 1
                optionsRefs.current[index].focus()
              } else if (e.key === 'ArrowRight') {
                const index = i === options.length - 1 ? 0 : i + 1
                optionsRefs.current[index].focus()
              }
            }}
          >
            {option.label || option.name}
          </button>
        ))}
      </div>
      <div className='tabs__divider' />
      <Spacer size='medium' />
      <div
        className='tabs__renderer'
        ref={rendererRef}
      >
        {typeof content === 'function' ? content() : content}
      </div>
    </div>
  )
}
