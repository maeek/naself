'use client'
import { useState } from 'react'
import {
  ArrowLeftRightIcon,
  CopyIcon,
  DownloadCloudIcon,
  EditIcon,
  EyeIcon,
  InfoIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon
} from 'lucide-react'
import { Blurhash } from 'react-blurhash'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { FileTypeIcon } from './icon'

export interface FileType {
  name: string
  ext: string
  type: 'file'
  size: string
  createdAt: string
  modifiedAt: string
  tag?: string
  color?: string
  preview?: {
    url: string
    blurhash?: string
  }
}

export const File = ({ file }: { file: FileType }) => {
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)

  return (
    <ContextMenu onOpenChange={open => setIsContextMenuOpen(open)}>
      <ContextMenuTrigger asChild>
        <button
          tabIndex={0}
          key={file.name}
          data-selected={isContextMenuOpen}
          className='border rounded-md dark:focus-within:bg-[#183351] dark:focus-within:border-primary focus-within:bg-[#cae3ff] transition-colors duration-100 cursor-default shadow-sm dark:data-[selected=true]:bg-[#183351] dark:data-[selected=true]:border-primary'
        >
          <div className='w-full flex justify-center items-centerrounded-tl-md rounded-tr-md'>
            <AspectRatio
              ratio={1 / 0.8}
              className='flex justify-center items-center'
            >
              {file.preview ? (
                <>
                  <img
                    className='h-full w-full overflow-hidden px-1 pt-1 object-cover rounded-lg data-[loaded=false]:opacity-0 transition-opacity duration-300'
                    src={file.preview.url}
                    alt={file.name}
                    data-loaded={previewLoaded}
                    ref={node => {
                      if (!node) return

                      node.addEventListener('load', () => {
                        setPreviewLoaded(true)
                      })

                      if (node.complete) {
                        setPreviewLoaded(true)
                      }
                    }}
                  />
                  <div
                    className='w-full h-full overflow-hidden pt-1 px-1 data-[loaded=true]:opacity-0 absolute top-0 left-0 transition-opacity duration-300 pointer-events-none'
                    data-loaded={previewLoaded}
                  >
                    <Blurhash
                      className='!h-full !w-full [&>canvas]:!h-full [&>canvas]:!object-cover [&>canvas]:rounded-sm'
                      hash={file.preview.blurhash!}
                      resolutionX={32}
                      resolutionY={32}
                    />
                  </div>
                </>
              ) : (
                <FileTypeIcon
                  ext={file.ext}
                  className='w-14 h-14 dark:text-sky-200 text-sky-950'
                />
              )}
            </AspectRatio>
          </div>
          <div className='text-ellipsis font-medium text-sm overflow-hidden py-3 px-2 nowrap'>{file.name}</div>
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-64'>
        {['jpg', 'jpeg', 'png', 'heic'].includes(file.ext) ? (
          <ContextMenuItem>
            <EyeIcon className='w-3 h-3 mr-3' />
            View
            <ContextMenuShortcut>Ctrl + E</ContextMenuShortcut>
          </ContextMenuItem>
        ) : (
          <ContextMenuItem>
            <EditIcon className='w-3 h-3 mr-3' />
            Edit
            <ContextMenuShortcut>Ctrl + E</ContextMenuShortcut>
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem>
          <CopyIcon className='w-3 h-3 mr-3' />
          Copy or Move
          <ContextMenuShortcut>Ctrl + C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilIcon className='w-3 h-3 mr-3' />
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <InfoIcon className='w-3 h-3 mr-3' />
          Properties
        </ContextMenuItem>
        <ContextMenuItem>
          <ArrowLeftRightIcon className='w-3 h-3 mr-3' />
          Convert
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ShareIcon className='w-3 h-3 mr-3' />
          Share
        </ContextMenuItem>
        <ContextMenuItem>
          <DownloadCloudIcon className='w-3 h-3 mr-3' />
          Download
          <ContextMenuShortcut>Ctrl + Y</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <TrashIcon className='w-3 h-3 mr-3' />
          Delete
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
