import Sidebar from './_components/sidebar'
import { TopBarProtected } from './_components/top-bar'

export default function FilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='main-layout'>
      <TopBarProtected />
      <div className='h-[calc(100dvh-4rem)] w-full'>
        <Sidebar />
        <div className='pl-72 max-lg:pl-0 h-full'>{children}</div>
      </div>
    </div>
  )
}
