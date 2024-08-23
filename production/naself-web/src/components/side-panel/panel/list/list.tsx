import { IconFolderFilled, IconLayoutDashboard, IconSettings, IconTool } from '@tabler/icons-react'
import { DEFAULT_COLORS } from '@/components/common/colors'
import { Spacer } from '@/components/common/spacer'
import { Item } from './item'
import './list.scss'

export const List = () => {
  const list = [
    {
      name: 'Dashboard',
      icon: <IconLayoutDashboard />
    },
    {
      name: 'Files',
      icon: <IconFolderFilled />,
      activeColor: DEFAULT_COLORS[0],
      subitems: [
        {
          name: 'Recent',
          link: '/files/recent',
          active: true
        },
        {
          name: 'All files',
          link: '/files/all'
        },
        {
          name: 'Bookmarks',
          link: '/files/bookmarks'
        },
        {
          name: 'Shared with me',
          link: '/files/shared'
        }
      ]
    },
    {
      name: 'Settings',
      icon: <IconSettings />,
      activeColor: DEFAULT_COLORS[1],
      subitems: [
        {
          name: 'General',
          link: '/settings/general'
        },
        {
          name: 'Sharing',
          link: '/settings/sharing',
          active: true
        },
        {
          name: 'Security',
          link: '/settings/security'
        },
        {
          name: 'Users & Groups',
          link: '/settings/users'
        },
        {
          name: 'Jobs',
          link: '/settings/jobs'
        },
        {
          name: 'System',
          link: '/settings/system'
        }
      ]
    },
    {
      name: 'Tools',
      icon: <IconTool />,
      activeColor: DEFAULT_COLORS[3],
      subitems: [
        {
          name: 'Clipboard',
          link: '/tools/clipboard'
        },
        {
          name: 'Downloader',
          link: '/tools/downloader',
          active: true
        }
      ]
    }
  ]

  return (
    <>
      <ul className='panel-list'>
        {list.map(item => (
          <>
            <Item
              key={item.name}
              item={item}
            />
            <Spacer
              size='medium'
              style={{ backgroundColor: 'var(--th-clr-bg)' }}
            />
          </>
        ))}
      </ul>
      <Spacer size='large' />
    </>
  )
}
