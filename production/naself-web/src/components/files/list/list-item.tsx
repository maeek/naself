'use client';
import { CSSProperties } from 'react';
import { IconDotsVertical, IconFileFilled, IconFolderFilled, IconLink } from '@tabler/icons-react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Spacer } from '@/components/common/spacer';
import './list-item.scss';

dayjs.extend(relativeTime);

export interface ListItemProps {
  name: string;
  owner: string;
  size?: number;
  modified: Date;
  isShared?: boolean;
  type: 'folder' | 'file';
  color?: string;
  selected?: boolean;
}

export const ListItem = ({ name, owner, modified, type, isShared, color, selected }: ListItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={classNames('files-list-item', {
        'files-list-item--selected': selected
      })}
      onClick={() => console.log('click')}
      onKeyUp={() => console.log('keyup')}
      style={
        {
          '--_icon-color': color
        } as CSSProperties
      }
    >
      <div className='files-list-item__info'>
        <figure
          className={classNames('files-list-item__icon', {
            folder: type === 'folder',
            file: type === 'file'
          })}
        >
          {type === 'folder' && <IconFolderFilled />}
          {type === 'file' && <IconFileFilled />}
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
            <b>·</b>
          </Spacer>
          <span className='files-list-item__modified'>{dayjs(modified).fromNow()}</span>
        </div>
        <div className='files-list-item__actions'>
          {isShared && <IconLink className='files-list-item--shared' />}
          <IconDotsVertical />
        </div>
      </div>
    </li>
  );
};
