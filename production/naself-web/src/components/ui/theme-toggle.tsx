'use client'

import * as React from 'react'
import { SunMoon, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {theme === 'light' ? (
          <Sun className='mr-2 h-4 w-4' />
        ) : theme === 'dark' ? (
          <Moon className='mr-2 h-4 w-4' />
        ) : (
          <SunMoon className='mr-2 h-4 w-4' />
        )}
        <span>Theme</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme('light')}>
            <Sun className='h-4 mr-2' /> Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            <Moon className='h-4 mr-2' /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            <SunMoon className='h-4 mr-2' /> System
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
