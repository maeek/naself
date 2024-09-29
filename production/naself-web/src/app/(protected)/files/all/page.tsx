import { Suspense } from 'react'
import { ArrowUpIcon, FolderSyncIcon, HomeIcon, ListFilter } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CreateButton } from '../_components/create-button'
import { File, FileType } from '../_components/file'
import { FilesLayout } from '../_components/files-layout'
import { Folder, FolderType } from '../_components/folder'
import { FoldersLayout } from '../_components/folders-layout'
import { LayoutButton } from '../_components/layout-button'
import { FileTags } from '../_components/tags'

const files = [
  {
    name: 'design.pdf',
    type: 'file',
    ext: 'pdf',
    size: '1.2 MB',
    createdAt: '2021-09-01',
    modifiedAt: '2021-09-01',
    tag: 'documents',
    color: ''
  },
  ...new Array(25).fill(null).map((_, i) => {
    const ext = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'][Math.floor(Math.random() * 7)]
    const isFile = i % 3 === 0
    return {
      name: isFile ? `design_${i}.${ext}` : `Folder ${i}`,
      type: isFile ? 'file' : 'folder',
      ext: isFile ? ext : '',
      size: isFile ? `${Math.random() * 155} MB` : '',
      createdAt: '2021-09-01',
      modifiedAt: '2021-09-01',
      tag: 'documents',
      color: isFile ? '' : ['#1C9BFF', '#D46667', '#687C90', '#08C7A7'][Math.floor(Math.random() * 4)]
    }
  }),
  ...new Array(12).fill(null).map((_, i) => {
    const ext = ['mp4', 'mp3', 'flac', 'mkv'][Math.floor(Math.random() * 4)]
    const isFile = i % 3 === 0
    return {
      name: isFile ? `media_${i}.${ext}` : `Media folder ${i}`,
      type: isFile ? 'file' : 'folder',
      ext: isFile ? ext : '',
      size: isFile ? `${Math.random() * 155} MB` : '',
      createdAt: '2021-09-01',
      modifiedAt: '2021-09-01',
      tag: 'media',
      color: isFile ? '' : ['#1C9BFF', '#D46667', '#687C90', '#08C7A7'][Math.floor(Math.random() * 4)]
    }
  })
]

export default function AllFiles() {
  files.sort((a, b) => {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true })
  })

  return (
    <main className='row-layout'>
      <section className='py-4 px-6 flex items-center justify-between gap-3 lg:sticky lg:top-16 lg:bg-background'>
        <div className='flex items-center'>
          <ArrowUpIcon className='mr-6 cursor-pointer hover:text-sky-400 flex-shrink-0' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href='/files/all'
                  className='flex items-center'
                >
                  <HomeIcon className='w-4 h-4 mr-2 stroke-accent-foreground' /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/files/all?path=components'>Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Design</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='flex gap-2'>
          <CreateButton />
          <LayoutButton />
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
          >
            <ListFilter className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
          >
            <FolderSyncIcon className='h-4 w-4' />
          </Button>
        </div>
      </section>
      <h2 className='px-6 text-xl font-semibold'>Design</h2>
      <p className='pb-3 px-6 text-sm'>3 files</p>
      <Suspense fallback={null}>
        <FileTags />
      </Suspense>
      <h2 className='py-4 px-6 font-semibold'>Folders</h2>
      <FoldersLayout>
        {files
          .filter(item => item.type === 'folder')
          .map(item => (
            <Folder
              key={item.name}
              folder={item as FolderType}
            />
          ))}
      </FoldersLayout>
      <h2 className='py-4 px-6 pt-6 font-semibold'>Files</h2>
      <FilesLayout>
        {files
          .filter(item => item.type === 'file')
          .map(item => (
            <File
              key={item.name}
              file={item as FileType}
            />
          ))}
      </FilesLayout>
      <div className='py-6' />
    </main>
  )
}
