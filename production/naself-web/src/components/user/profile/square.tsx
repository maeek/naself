import { IconLogout } from '@tabler/icons-react'
import './square.scss'

export const ProfileSquare = () => {
  return (
    <div className='profile-square__container'>
      <div className='profile-square'>
        <div className='profile-square__left'>
          <div className='profile-square__icon'></div>
          <div className='profile-square__username'>maek</div>
        </div>
        <div className='profile-square__action'>
          <IconLogout />
        </div>
      </div>
    </div>
  )
}
