'use client'
import { CSSProperties } from 'react'
import { IconDotsVertical, IconFolderFilled, IconLink } from '@tabler/icons-react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Checkbox } from '@/components/common/checkbox'
import { Dot } from '@/components/common/dot/dot'
import { FileIcon } from '@/components/common/file-icon/file-icon'
import { Spacer } from '@/components/common/spacer'
import './list-item.scss'

dayjs.extend(relativeTime)

export interface ListItemProps {
  name: string
  owner: string
  size?: number
  modified: Date
  isShared?: boolean
  type: 'folder' | 'file'
  filetype?: string
  color?: string
  selected?: boolean
  onSelected?: (name: string, multiple?: boolean) => void
  style?: CSSProperties
  isOdd?: boolean
  isCheckboxVisible?: boolean
  isSelected?: boolean
}

export const ListItem = ({
  name,
  owner,
  modified,
  type,
  isShared,
  color,
  selected,
  onSelected,
  filetype,
  style,
  isOdd,
  isCheckboxVisible,
  isSelected
}: ListItemProps) => {
  return (
    <div
      className={classNames('files-list-item__wrapper', { odd: isOdd })}
      style={style}
    >
      <div
        role='listitem'
        tabIndex={0}
        className={classNames('files-list-item', {
          'files-list-item--selected': selected
        })}
        onContextMenu={e => {
          e.preventDefault()
          onSelected?.(name)
        }}
        style={
          {
            '--_icon-color': color
          } as CSSProperties
        }
      >
        <div className='files-list-item__info'>
          {isCheckboxVisible && (
            <Checkbox
              checked={isSelected}
              onChange={(_, multiple) => {
                onSelected?.(name, multiple)
              }}
            />
          )}
          <figure
            className={classNames('files-list-item__icon', {
              folder: type === 'folder',
              file: type === 'file'
            })}
          >
            {type === 'folder' && <IconFolderFilled />}
            {type === 'file' && <FileIcon filetype={filetype} />}
          </figure>
          <span className='files-list-item__name'>{name}</span>
        </div>
        <div className='files-list-item__right'>
          <div className='files-list-item__details'>
            <span className='files-list-item__owner'>{owner}</span>
            <Spacer
              size='small'
              type='horizontal'
            >
              <Dot />
            </Spacer>
            <span className='files-list-item__modified'>{dayjs(modified).fromNow()}</span>
          </div>
          <div className='files-list-item__actions'>
            {isShared && <IconLink className='files-list-item--shared' />}
            <IconDotsVertical />
          </div>
        </div>
      </div>
    </div>
  )
}
