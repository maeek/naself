'use client'

import { IconFileFilled, IconFileTypePdf, IconFileTypeTxt, IconMovie, IconVideo } from '@tabler/icons-react'
import './file-icon.scss'

export enum FileIconType {
  PDF = 'pdf'
}

interface FileIconProps {
  filetype?: FileIconType | string
}

export const FileIcon = ({ filetype }: FileIconProps) => {
  let icon

  switch ((filetype || '').toLowerCase()) {
    case 'pdf':
      icon = <IconFileTypePdf />
      break

    case 'txt':
      icon = <IconFileTypeTxt />
      break

    case 'mkv':
      icon = <IconMovie />
      break

    default:
      icon = <IconFileFilled />
      break
  }

  return <picture className='file-icon'>{icon}</picture>
}
