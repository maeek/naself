import Sidebar from '@/components/layout/sidebar'
import { TopBar } from '@/components/layout/top-bar'
import './layout.scss'

export default function FilesLayout() {
  return (
    <div className='files-layout'>
      <TopBar />
      <div className='h-full w-full'>
        <Sidebar />
        <div className='files-layout__content'></div>
      </div>
    </div>
  )
}
