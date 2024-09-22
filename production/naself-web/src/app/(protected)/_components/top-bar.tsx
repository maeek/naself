import { CSSProperties } from 'react'
import classNames from 'classnames'
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { NaselfLogo } from '@/components/ui/naself-logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export const TopBarProtected = () => {
  const sectionClasses = 'flex items-center h-full px-4 gap-x-4'

  return (
    <div className='z-50 flex justify-between h-16 w-dvw border-b border-b-layout-border bg-layout flex-shrink-0 sticky top-0'>
      <div className={classNames(sectionClasses, 'justify-start')}>
        <Link href='/'>
          <NaselfLogo />
        </Link>
      </div>
      <div className={classNames(sectionClasses, 'justify-center flex-initial w-full max-w-screen-sm')}>
        <Input
          placeholder='Search files or execute an action'
          type='search'
          className='h-10'
        />
      </div>
      <div className={classNames(sectionClasses, 'justify-end')}>
        <Button className='font-semibold'>Upload</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src='https://static.suchanecki.me/avatar.png' />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            style={{ width: '12rem' } as CSSProperties}
          >
            <ThemeToggle />
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className='w-4 h-4 mr-2' /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className='w-4 h-4 mr-2' /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className='w-4 h-4 mr-2' /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
