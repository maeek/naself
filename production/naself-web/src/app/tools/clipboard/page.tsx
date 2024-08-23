'use client'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { BurgerButton } from '@/components/common/burger/burger'
import Portal from '@/components/common/portal/portal'
import { Heading } from '@/components/common/typo/heading'
import { Drawer } from '@/components/side-panel/drawer/drawer'
import { Panel } from '@/components/side-panel/panel/panel'
import './page.scss'

export default function ToolsClipboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isBigScreen = useMediaQuery({ minWidth: 1024 })

  return (
    <main className='row-layout'>
      <div id='side-root' />
      <div className='tools-clipboard'>
        <div className='tools-clipboard-header-container'>
          <Heading level={3}>Clipboard</Heading>
          <BurgerButton
            onClick={() => setIsDrawerOpen(p => !p)}
            open={isDrawerOpen}
            className='burger-button'
          />
        </div>
        <textarea></textarea>
      </div>

      <Portal mountPointId={isBigScreen ? 'side-root' : 'modal-root'}>
        {isBigScreen ? (
          <Panel />
        ) : (
          <Drawer
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </Portal>
    </main>
  )
}
