import { TopBar } from '@/components/layout/top-bar'
import './layout.scss'

export default function FilesLayout() {
  return (
    <div className='files-layout'>
      <TopBar />
      <div className='files-layout__container'>
        <div className='files-layout__sidebar'></div>
        <div className='files-layout__content'></div>
      </div>
    </div>
  )
}
