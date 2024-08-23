import classNames from 'classnames'
import { Banner } from '@/components/common/banner/banner'
import { Spacer } from '@/components/common/spacer'
import { Heading } from '@/components/common/typo/heading'
import { ProfileSquare } from '@/components/user/profile/square'
import { PanelUserAction } from '../user-action/user-action'
import { List } from './list/list'
import './panel.scss'

interface PanelProps {
  button?: React.ReactNode
  className?: string
}

export const Panel = ({ button, className }: PanelProps) => {
  return (
    <aside className={classNames('panel', className)}>
      <div className='panel-wrapper'>
        <div className='panel-header'>
          <Banner className='panel-banner' />
          {button}
        </div>
        <Spacer size='small' />
        <PanelUserAction />
        <Spacer size='small' />
        <Heading level={6}>Navigation</Heading>
        <Spacer size='medium' />
        <div className='panel-content'>
          <List />
        </div>
      </div>
      <div className='panel-footer'>
        <ProfileSquare />
      </div>
    </aside>
  )
}
