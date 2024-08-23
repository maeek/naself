import { IconChevronRight } from '@tabler/icons-react'
import classNames from 'classnames'
import { Heading } from '@/components/common/typo/heading'
import './path-breadcrumbs.scss'

interface PathBreadcrumbsProps {
  className?: string
  paths: {
    name: string
  }[]
}

export const PathBreadcrumbs = ({ paths, className }: PathBreadcrumbsProps) => {
  return (
    <>
      <div className={classNames('path-breadcrumbs__container', 'desktop', className)}>
        {paths.map((path, index) => (
          <>
            <div
              key={paths.reduce((acc, curr, i) => {
                if (index <= i) {
                  return acc + curr.name
                }
                return acc
              }, '')}
              className={classNames('path-breadcrumbs__item', {
                'path-breadcrumbs__item--active': index === paths.length - 1
              })}
            >
              {path.name}
            </div>
            {index !== paths.length - 1 && (
              <div className='path-breadcrumbs__separator'>
                <IconChevronRight />
              </div>
            )}
          </>
        ))}
      </div>
      <div className={classNames('path-breadcrumbs__container', 'mobile', className)}>
        {paths.length > 1 && (
          <>
            <div className={classNames('path-breadcrumbs__item')}>{paths[0].name}</div>
            <div className='path-breadcrumbs__separator'>
              <IconChevronRight />
            </div>
            {paths.length > 2 && (
              <>
                <div className={classNames('path-breadcrumbs__item')}>...</div>
                <div className='path-breadcrumbs__separator'>
                  <IconChevronRight />
                </div>
              </>
            )}
          </>
        )}
        <Heading
          level={6}
          className={classNames('path-breadcrumbs__item', {
            'path-breadcrumbs__item--active': true
          })}
        >
          {paths[paths.length - 1].name}
        </Heading>
      </div>
    </>
  )
}
