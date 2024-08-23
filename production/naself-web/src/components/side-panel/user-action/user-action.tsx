import { Dot } from '@/components/common/dot/dot'
import './user-action.scss'

export const PanelUserAction = () => {
  return (
    <div className='panel-user-action__container'>
      <div className='panel-user-action'>
        <div className='panel-user-action__progress'>93%</div>
        <div className='panel-user-action__info'>
          <div className='panel-user-action__name'>Uploading 5 files...</div>
          <div className='panel-user-action__description'>
            <div className='panel-user-action__description-text'>
              93% <Dot /> System requirements.pdf
            </div>
            <div className='panel-user-action__action'>Abort</div>
          </div>
        </div>
      </div>
    </div>
  )
}
