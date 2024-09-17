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
  ShareIcon,
  ShieldCheckIcon,
  UsersIcon
} from 'lucide-react'

export default function Sidebar() {
  const filesSections = [
    { name: 'Recent', Icon: ClockIcon },
    { name: 'All Files', Icon: FilesIcon },
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
    { name: 'System', Icon: ServerIcon }
  ]

  const appsSections = [
    { name: 'Clipboard', Icon: ClipboardIcon },
    { name: 'Converter', Icon: FolderSyncIcon },
    { name: 'Downloader', Icon: HardDriveDownloadIcon }
  ]

  return (
    <aside className='h-full w-72 border-r border-r-layout-border flex flex-col bg-layout overflow-auto pb-8'>
      <div className='w-full py-6 flex flex-col px-2'>
        <h6 className='text-xs pb-2 font-semibold color-secondary px-2'>Files</h6>
        <ul className='w-full pb-6 flex flex-col'>
          {filesSections.map(({ name, Icon }) => (
            <li
              key={name}
              className='flex gap-3 justify-start items-center px-2 py-1 hover:bg-input rounded-sm text-primary hover:text-white cursor-pointer'
            >
              <div className='w-6 h-6 rounded-sm flex justify-center items-center'>
                <Icon className='w-4 h-4 stroke-current' />
              </div>
              <span className='text-sm text-inherit'>{name}</span>
            </li>
          ))}
        </ul>
        <h6 className='text-xs pb-2 font-semibold color-secondary px-2'>Settings</h6>
        <ul className='w-full pb-6 flex flex-col'>
          {settingsSections.map(({ name, Icon }) => (
            <li
              key={name}
              className='flex gap-3 justify-start items-center px-2 py-1 hover:bg-input rounded-sm text-primary hover:text-white cursor-pointer'
            >
              <div className='w-6 h-6 rounded-sm flex justify-center items-center'>
                <Icon className='w-4 h-4 stroke-current' />
              </div>
              <span className='text-sm text-inherit'>{name}</span>
            </li>
          ))}
        </ul>
        <h6 className='text-xs pb-2 font-semibold color-secondary px-2'>Tools</h6>
        <ul className='w-full pb-6 flex flex-col'>
          {appsSections.map(({ name, Icon }) => (
            <li
              key={name}
              className='flex gap-3 justify-start items-center px-2 py-1 hover:bg-input rounded-sm text-primary hover:text-white cursor-pointer'
            >
              <div className='w-6 h-6 rounded-sm flex justify-center items-center'>
                <Icon className='w-4 h-4 stroke-current' />
              </div>
              <span className='text-sm text-inherit'>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
