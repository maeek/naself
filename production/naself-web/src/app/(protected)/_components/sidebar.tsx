'use client'

import classNames from 'classnames'
import {
  ActivityIcon,
  BookmarkIcon,
  ClipboardIcon,
  ClockIcon,
  FilesIcon,
  FolderSyncIcon,
  HardDriveDownloadIcon,
  LinkIcon,
  PackageCheckIcon,
  ServerIcon,
  SettingsIcon,
  Share2Icon,
  ShieldCheckIcon,
  UsersIcon
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const filesSections = [
    { name: 'Recent', Icon: ClockIcon, href: '/files/recent' },
    { name: 'All Files', Icon: FilesIcon, href: '/files/all' },
    { name: 'Bookmarks', Icon: BookmarkIcon },
    { name: 'Shared with me', Icon: Share2Icon }
  ]

  const settingsSections = [
    { name: 'General', Icon: SettingsIcon },
    { name: 'Sharing', Icon: LinkIcon },
    { name: 'Users & Groups', Icon: UsersIcon },
    { name: 'Activity', Icon: ActivityIcon },
    { name: 'Security', Icon: ShieldCheckIcon },
    { name: 'External Storage', Icon: ServerIcon },
    { name: 'Jobs', Icon: PackageCheckIcon },
    { name: 'System', Icon: ServerIcon, href: '/settings/system' }
  ]

  const appsSections = [
    { name: 'Clipboard', Icon: ClipboardIcon, href: '/apps/clipboard' },
    { name: 'Converter', Icon: FolderSyncIcon },
    { name: 'Downloader', Icon: HardDriveDownloadIcon }
  ]

  return (
    <aside className='h-full w-72 border-r border-r-layout-border flex flex-col bg-layout overflow-auto pb-8 fixed left-0 top-16 max-lg:hidden'>
      <div className='w-full py-6 flex flex-col px-2'>
        <h6 className='text-xs pb-2 font-semibold color-secondary px-2'>Files</h6>
        <ul className='w-full pb-6 flex flex-col'>
          {filesSections.map(({ name, Icon, href }) => (
            <Link
              key={name}
              href={href || '/'}
            >
              <li
                className={classNames(
                  'flex gap-3 justify-start items-center px-2 py-1 hover:bg-input rounded-sm text-foreground hover:text-white cursor-pointer',
                  { 'bg-input': pathname === href }
                )}
              >
                <div className='w-6 h-6 rounded-sm flex justify-center items-center'>
                  <Icon className='w-4 h-4 stroke-current' />
                </div>
                <span className='text-sm text-inherit'>{name}</span>
              </li>
            </Link>
          ))}
        </ul>
        <h6 className='text-xs pb-2 font-semibold color-secondary px-2'>Settings</h6>
        <ul className='w-full pb-6 flex flex-col'>
          {settingsSections.map(({ name, Icon, href }) => (
            <Link
              key={name}
              href={href || '/'}
            >
              <li
                className={classNames(
                  'flex gap-3 justify-start items-center px-2 py-1 hover:bg-input rounded-sm text-foreground hover:text-white cursor-pointer',
                  { 'bg-input': pathname === href }
                )}
              >
                <div className='w-6 h-6 rounded-sm flex justify-center items-center'>
                  <Icon className='w-4 h-4 stroke-current' />
                </div>
                <span className='text-sm text-inherit'>{name}</span>
              </li>
            </Link>
          ))}
        </ul>
        <h6 className='text-xs pb-2 font-semibold color-secondary px-2'>Tools</h6>
        <ul className='w-full pb-6 flex flex-col'>
          {appsSections.map(({ name, Icon, href }) => (
            <Link
              key={name}
              href={href || '/'}
            >
              <li
                className={classNames(
                  'flex gap-3 justify-start items-center px-2 py-1 hover:bg-input rounded-sm text-foreground hover:text-white cursor-pointer',
                  { 'bg-input': pathname === href }
                )}
              >
                <div className='w-6 h-6 rounded-sm flex justify-center items-center'>
                  <Icon className='w-4 h-4 stroke-current' />
                </div>
                <span className='text-sm text-inherit'>{name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  )
}
