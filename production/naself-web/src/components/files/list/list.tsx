import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { ListItem } from './list-item'

export interface Item {
  name: string
  owner: string
  modified: Date
  type: 'folder' | 'file'
  isShared?: boolean
  color?: string
  filetype?: string
  isSelected?: boolean
}

interface InfiniteListProps {
  items: Item[]
  checkboxesVisible?: boolean
  onSelected?: (name: string, multiple?: boolean) => void
}

export const InfiniteList = ({ items, checkboxesVisible, onSelected }: InfiniteListProps) => {
  const isItemLoaded = (index: number) => index < items.length

  return (
    <InfiniteLoader
      itemCount={items.length}
      isItemLoaded={isItemLoaded}
      loadMoreItems={() => {}}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              itemCount={items.length}
              onItemsRendered={onItemsRendered}
              ref={ref}
              itemSize={60}
              height={height}
              width={width}
              overscanCount={20}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {({ index, style }) => (
                <ListItem
                  isOdd={index % 2 === 0}
                  style={style}
                  key={items[index].name}
                  name={items[index].name}
                  owner={items[index].owner}
                  modified={items[index].modified}
                  type={items[index].type}
                  isShared={items[index].isShared}
                  color={items[index].color}
                  filetype={items[index].filetype}
                  isSelected={items[index].isSelected}
                  isCheckboxVisible={checkboxesVisible}
                  onSelected={onSelected}
                />
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  )
}
