'use client'

import { CSSProperties } from 'react'
import { FolderIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export interface FolderType {
  name: string
  ext: string
  type: 'folder'
  size: string
  createdAt: string
  modifiedAt: string
  tag?: string
  color?: string
}

export const Folder = ({ folder }: { folder: FolderType }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onDoubleClick = () => {
    const currentPath = searchParams.get('path') || ''
    router.push(`/files?path=${currentPath}/${folder.name}`)
  }

  return (
    <button
      tabIndex={0}
      key={folder.name}
      className='border rounded-md flex items-center dark:focus:bg-[#183351] dark:focus:border-primary focus:bg-[#cae3ff] transition-colors duration-100 cursor-default'
      onDoubleClick={onDoubleClick}
    >
      <div
        style={{ '--x-color': folder.color || 'white' } as CSSProperties}
        className='flex justify-center items-center p-3 pr-1 rounded-tl-md rounded-tr-md text-[var(--x-color)]'
      >
        <FolderIcon
          fill='currentColor'
          color={folder.color || 'white'}
          className='w-6 h-6'
        />
      </div>
      <div className='text-ellipsis font-medium text-sm overflow-hidden px-2 whitespace-nowrap'>{folder.name}</div>
    </button>
  )
}
