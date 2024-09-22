import Sidebar from '@/app/(protected)/_components/sidebar'
import { TopBarProtected } from './_components/top-bar'

export default function FilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='main-layout'>
      <TopBarProtected />
      <div className='h-full w-full'>
        <Sidebar />
        <div className='pl-72 max-lg:pl-0'>{children}</div>
      </div>
    </div>
  )
}
