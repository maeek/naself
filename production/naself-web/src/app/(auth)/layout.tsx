import { TopBarProtected } from '@/components/layout/top-bar'

export default function FilesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col w-full h-full'>
      <TopBarProtected />
      <div className='h-full w-full flex-grow'>{children}</div>
    </div>
  )
}
