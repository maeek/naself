'use client'

import { Suspense } from 'react'
import { ArrowUpIcon, HomeIcon, ListFilter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CreateButton } from './_components/create-button'
import { File, FileType } from './_components/file'
import { FilesLayout } from './_components/files-layout'
import { Folder, FolderType } from './_components/folder'
import { FoldersLayout } from './_components/folders-layout'
import { LayoutButton } from './_components/layout-button'
import { FileTags } from './_components/tags'

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
  }),
  ...new Array(5).fill(null).map((_, i) => {
    const ext = ['jpg', 'png', 'heic'][Math.floor(Math.random() * 3)]
    return {
      name: `img_${i}.${ext}`,
      type: 'file',
      ext,
      size: `${Math.random() * 4} MB`,
      createdAt: '2021-09-01',
      modifiedAt: '2021-09-01',
      tag: 'images',
      color: '',
      preview: {
        ...[
          {
            url: 'https://static.suchanecki.me/neony.jpeg',
            blurhash: 'eGH0MRab7LL4%40^5,=H$ka$R4tSxvnNS}NyrrJV%1Ri$%xaRjfhM|'
          },
          {
            url: 'https://static.suchanecki.me/nasa.jpg',
            blurhash: 'e4Hkzd0kOn0k111x9_1L^3=v1KNc5.=v$h0k^Mwe}pRl0k^M,=J9Nb'
          },
          {
            url: 'https://static.suchanecki.me/twist.jpg',
            blurhash: 'e69P=^000}OQj.ELbusmw^t900%h}sxJIbM_-qR+EMnz^lRPEzjXxp'
          }
        ][Math.floor(Math.random() * 3)]
      }
    }
  })
]

export default function AllFiles() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')

  const filesFiltered = files
    .filter(f => !tag || tag === 'files' || tag === 'folders' || f.tag === tag)
    .sort((a, b) => {
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true })
    })

  return (
    <main className='row-layout'>
      <section className='py-4 px-6 flex items-center justify-between gap-3 sticky top-16 bg-background z-50'>
        <div className='flex items-center justify-between w-full'>
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
        </div>
      </section>
      <div className='px-6 flex items-center justify-between w-full gap-2'>
        <div className='flex-shrink-1 overflow-hidden text-ellipsis'>
          <h2 className='text-xl font-semibold overflow-hidden text-ellipsis'>Design</h2>
          <p className='pb-3 text-sm'>{filesFiltered.length} files</p>
        </div>
        <div className='flex gap-2'>
          <LayoutButton />
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
          >
            <ListFilter className='h-4 w-4' />
          </Button>
          <CreateButton />
        </div>
      </div>
      <Suspense fallback={null}>
        <FileTags />
      </Suspense>
      {!tag || tag !== 'files' ? (
        <>
          <h2 className='py-4 px-6 pt-6 font-semibold'>Folders</h2>
          <FoldersLayout>
            {filesFiltered
              .filter(item => item.type === 'folder')
              .map(item => (
                <Suspense
                  key={item.name}
                  fallback={null}
                >
                  <Folder
                    key={item.name}
                    folder={item as FolderType}
                  />
                </Suspense>
              ))}
          </FoldersLayout>
        </>
      ) : null}
      {!tag || tag !== 'folders' ? (
        <>
          <h2 className='py-4 px-6 pt-6 font-semibold'>Files</h2>
          <FilesLayout>
            {filesFiltered
              .filter(item => item.type === 'file')
              .map(item => (
                <File
                  key={item.name}
                  file={item as FileType}
                />
              ))}
          </FilesLayout>
        </>
      ) : null}

      <div className='py-6' />
    </main>
  )
}
