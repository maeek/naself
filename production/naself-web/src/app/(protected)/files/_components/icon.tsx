import {
  IconPdf,
  IconFileTypeDocx,
  IconFileTypeDoc,
  IconFileTypeXls,
  IconFileTypePpt,
  IconMovie,
  IconMusic
} from '@tabler/icons-react'
import { FileIcon } from 'lucide-react'

export const FileTypeIcon = ({ ext, className }: { ext: string; className?: string }) => {
  switch (ext) {
    // Document types
    case 'pdf':
      return (
        <IconPdf
          stroke={1.2}
          className={className}
        />
      )

    case 'doc':
      return (
        <IconFileTypeDoc
          stroke={1.2}
          className={className}
        />
      )

    case 'docx':
      return (
        <IconFileTypeDocx
          stroke={1.2}
          className={className}
        />
      )

    case 'xls':
    case 'xlsx':
      return (
        <IconFileTypeXls
          stroke={1.2}
          className={className}
        />
      )

    case 'pptx':
    case 'ppt':
      return (
        <IconFileTypePpt
          stroke={1.2}
          className={className}
        />
      )

    // Media types
    case 'mp4':
    case 'mkv':
    case 'avi':
    case 'mov':
      return (
        <IconMovie
          stroke={1.2}
          className={className}
        />
      )

    case 'mp3':
    case 'flac':
    case 'wav':
    case 'ogg':
    case 'm4a':
    case 'wma':
    case 'aac':
      return (
        <IconMusic
          stroke={1.2}
          className={className}
        />
      )

    default:
      return <FileIcon className={className} />
  }
}
