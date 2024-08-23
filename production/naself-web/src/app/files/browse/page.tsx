'use client'
import { ReactNode, useDeferredValue, useState } from 'react'
import {
  IconArrowDown,
  IconArrowsSort,
  IconCopy,
  IconFilePlus,
  IconFileUpload,
  IconFolderPlus,
  IconLinkPlus,
  IconSearch,
  IconTrash
} from '@tabler/icons-react'
import { useMediaQuery } from 'react-responsive'
import { BurgerButton } from '@/components/common/burger/burger'
import { Button } from '@/components/common/button'
import { Checkbox } from '@/components/common/checkbox'
import { DEFAULT_COLORS } from '@/components/common/colors'
import Portal from '@/components/common/portal/portal'
import { Spacer } from '@/components/common/spacer'
import { Input } from '@/components/common/text-input'
import { InfiniteList } from '@/components/files/list/list'
import { PathBreadcrumbs } from '@/components/files/path-breadcrumbs/path-breadcrumbs'
import { Drawer } from '@/components/side-panel/drawer/drawer'
import { Panel } from '@/components/side-panel/panel/panel'
import './page.scss'

const list = [
  {
    name: 'very long naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaame',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'folder'
  },
  {
    name: 'Design',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'folder',
    color: DEFAULT_COLORS[0]
  },
  {
    name: 'Projects',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'folder',
    isShared: true,
    color: DEFAULT_COLORS[0]
  },
  {
    name: 'Folder (1)',
    owner: 'You',
    modified: new Date('2022-11-05'),
    type: 'folder',
    color: DEFAULT_COLORS[0]
  },
  {
    name: 'Fodler (2)',
    owner: 'You',
    modified: new Date('2023-01-05'),
    type: 'folder',
    color: DEFAULT_COLORS[3]
  },
  {
    name: 'Movies',
    owner: 'You',
    modified: new Date('2023-05-05'),
    type: 'folder',
    color: DEFAULT_COLORS[4]
  },
  {
    name: 'Cartoons',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'folder',
    color: DEFAULT_COLORS[5]
  },
  {
    name: 'Oop',
    owner: 'You',
    modified: new Date('2022-01-15'),
    type: 'folder',
    color: DEFAULT_COLORS[6]
  },
  {
    name: 'Kastet',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'folder',
    color: DEFAULT_COLORS[7]
  },
  {
    name: 'Design.pdf',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'file',
    filetype: 'pdf',
    color: DEFAULT_COLORS[1]
  },
  {
    name: 'test.txt',
    owner: 'You',
    modified: new Date('2024-11-05'),
    type: 'file',
    filetype: 'txt'
  },
  {
    name: 'The Punisher - Season 01 Episode 05 - MKV- WEDL HDR10 ETHEL NETFLIX.mkv',
    owner: 'You',
    modified: new Date('2024-10-15'),
    type: 'file',
    filetype: 'mkv',
    color: DEFAULT_COLORS[4]
  },
  {
    name: 'README.md',
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: 'file'
  },
  ...new Array(100).fill(null).map((_, i) => ({
    name: `File ${i + 1}`,
    owner: 'You',
    modified: new Date('2023-11-05'),
    type: Math.random() > 0.5 ? 'folder' : 'file',
    color: DEFAULT_COLORS[i % DEFAULT_COLORS.length]
  }))
]

export default function FilesBrowse() {
  const [searchItems, setSearchItems] = useState('')
  const deferredSearch = useDeferredValue(searchItems)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isBigScreen = useMediaQuery({ minWidth: 1024 })
  const [checkboxesVisible, setCheckboxesVisible] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  return (
    <main className='row-layout'>
      <div id='side-root' />
      <div className='files-content-wrapper'>
        <div className='files-header-container'>
          <Input
            type='search'
            prefix={<IconSearch />}
            fitToContainer
            placeholder='Search'
            style={{ height: 'calc(100% - 0.3rem)', marginTop: '0.1rem' }}
            onChange={e => setSearchItems(e.target.value)}
          />
          <BurgerButton
            onClick={() => setIsDrawerOpen(p => !p)}
            open={isDrawerOpen}
            className='burger-button'
          />
        </div>
        <Spacer size='extra-small' />
        <PathBreadcrumbs
          className='files-path-breadcrumbs'
          paths={[
            { name: 'Home' },
            { name: '10.20.0.218' },
            { name: 'multimedia' },
            { name: 'Shows' },
            { name: 'The Mandalorian [tt8111088]' },
            { name: 'Season 3' },
            { name: 'The Punisher - Season 01 Episode 05 - MKV- WEDL HDR10 ETHEL NETFLIX' }
          ]}
        />
        <Spacer size='small' />
        <div className='files-actions'>
          {selectedItems.length === 0 ? (
            <>
              <Button
                prefix={<IconFilePlus />}
                variant='primary'
                size='small'
              >
                Create
              </Button>
              <Button
                prefix={<IconFolderPlus />}
                variant='secondary'
                size='small'
              >
                New Folder
              </Button>
              <Button
                prefix={<IconFileUpload />}
                variant='secondary'
                size='small'
              >
                Upload
              </Button>
            </>
          ) : (
            <>
              <Button
                prefix={<IconLinkPlus />}
                variant='secondary'
                size='small'
              >
                Share
              </Button>
              <Button
                prefix={<IconCopy />}
                variant='secondary'
                size='small'
              >
                Copy/Move
              </Button>
              <Button
                prefix={<IconTrash />}
                variant='danger'
                size='small'
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <Spacer size='small' />
        <div className='files-header'>
          <Checkbox
            className='files-action-checkbox'
            checked={list.length === selectedItems.length}
            onChange={() => {
              if (list.length === selectedItems.length) {
                setSelectedItems([])
                setCheckboxesVisible(false)
                return
              }

              setSelectedItems(list.map(item => item.name))
              setCheckboxesVisible(true)
            }}
          />
          <div className='files-header-columns'>
            <div className='files-header-item'>
              Name <IconArrowDown />
            </div>
            <div className='files-header-item'>
              Details <IconArrowsSort />
            </div>
          </div>
        </div>
        <div className='files-content'>
          <InfiniteList
            checkboxesVisible={checkboxesVisible}
            onSelected={(name, multiple) => {
              if (selectedItems.length === 1 && selectedItems[0] === name) {
                setCheckboxesVisible(false)
                setSelectedItems([])
                return
              }
              setCheckboxesVisible(true)
              setSelectedItems(prev => {
                if (prev.includes(name)) return prev.filter(n => n !== name)

                const more = []
                if (multiple) {
                  const index = list.findIndex(item => item.name === prev[prev.length - 1])
                  const newIndex = list.findIndex(item => item.name === name)
                  const [start, end] = index < newIndex ? [index, newIndex] : [newIndex, index]
                  for (let i = start; i <= end; i++) {
                    more.push(list[i].name)
                  }
                }

                return [...prev, name, ...more]
              })
            }}
            items={list
              .sort((a, b) => {
                if (a.type === 'folder' && b.type === 'file') return -1
                if (a.type === 'file' && b.type === 'folder') return 1
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en', { numeric: true })
              })
              .reduce<ReactNode[]>((acc, item) => {
                if (!item.name.toLowerCase().includes(deferredSearch.toLowerCase())) return acc

                acc.push({ ...item, isSelected: selectedItems.includes(item.name) })
                return acc
              }, [])}
          />
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
      </div>
    </main>
  )
}
