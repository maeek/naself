import { CSSProperties } from 'react'
import classNames from 'classnames'
import { LogOutIcon, MenuIcon, SettingsIcon, SidebarCloseIcon, UserIcon } from 'lucide-react'
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
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Sidebar from './sidebar'

export const TopBarProtected = () => {
  const sectionClasses = 'flex items-center h-full px-4 gap-x-4 max-sm:px-2 sm:w-[33%]'

  return (
    <div className='z-50 flex justify-between h-16 w-dvw border-b border-b-layout-border bg-layout flex-shrink-0 sticky top-0 max-w-full'>
      <div className={classNames(sectionClasses, 'justify-start max-sm:hidden')}>
        <Link href='/'>
          <NaselfLogo />
        </Link>
      </div>
      <div
        className={classNames(sectionClasses, 'justify-center flex-initial w-[26rem] max-sm:w-full max-w-screen-sm')}
      >
        <div className='flex items-center lg:hidden'>
          <Sheet>
            <SheetTrigger>
              <MenuIcon className='w-6 h-6 ml-2' />
            </SheetTrigger>
            <SheetContent
              side='left'
              className='p-0 w-full'
            >
              <Sidebar
                forceMobile
                closeNodeSlot={
                  <div className='w-full p-4 sticky top-0 bg-layout border-b flex justify-between items-center'>
                    <SheetClose className='flex gap-2 items-center'>
                      <SidebarCloseIcon className='w-6 h-6' /> Close
                    </SheetClose>
                    <Avatar>
                      <AvatarImage src='https://static.suchanecki.me/avatar.png' />
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                  </div>
                }
              />
            </SheetContent>
          </Sheet>
        </div>
        <Input
          placeholder='Search files or execute an action'
          type='search'
          className='h-10 placeholder:text-ellipsis'
        />
      </div>
      <div className={classNames(sectionClasses, 'justify-end')}>
        <Button className='font-semibold max-sm:hidden'>Upload</Button>
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
