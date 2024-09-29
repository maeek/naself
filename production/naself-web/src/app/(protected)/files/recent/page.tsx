import { Suspense } from 'react'
import { FolderSyncIcon, ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { File, FileType } from '../_components/file'
import { FilesLayout } from '../_components/files-layout'
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
  ...new Array(4).fill(null).map((_, i) => {
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
  ...new Array(8).fill(null).map((_, i) => {
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

export default function Recent() {
  return (
    <main className='row-layout'>
      <section className='py-4 px-6 flex items-center justify-between gap-3'>
        <h2 className='text-xl font-semibold'>Recent</h2>
        <div className='flex gap-2'>
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
      <Suspense fallback={null}>
        <FileTags />
      </Suspense>
      <section>
        <h2 className='py-4 pt-6 px-6 font-semibold'>Last 24h</h2>
        <FilesLayout>
          {files.slice(0, 6).map(item => (
            <File
              key={item.name}
              file={item as FileType}
            />
          ))}
        </FilesLayout>
        <h2 className='py-4 px-6 font-semibold'>Last week</h2>
        <FilesLayout>
          {files.slice(6).map(item => (
            <File
              key={item.name}
              file={item as FileType}
            />
          ))}
        </FilesLayout>
      </section>
    </main>
  )
}
