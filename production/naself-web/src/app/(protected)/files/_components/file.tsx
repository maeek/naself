import { AspectRatio } from '@/components/ui/aspect-ratio'
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
}

export const File = ({ file }: { file: FileType }) => {
  return (
    <div
      key={file.name}
      className='border rounded-md'
    >
      <div className='w-full flex justify-center items-centerrounded-tl-md rounded-tr-md'>
        <AspectRatio
          ratio={1 / 0.8}
          className='flex justify-center items-center'
        >
          <FileTypeIcon
            ext={file.ext}
            className='w-14 h-14 text-sky-200'
          />
        </AspectRatio>
      </div>
      <div className='text-ellipsis font-medium text-sm overflow-hidden py-3 px-2 nowrap'>{file.name}</div>
    </div>
  )
}
