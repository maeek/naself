import { CSSProperties } from 'react'
import { FolderIcon } from 'lucide-react'

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
  return (
    <div
      key={folder.name}
      className={`border rounded-md flex items-center`}
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
    </div>
  )
}
