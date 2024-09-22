import { FolderSyncIcon, ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LayoutButton } from '../_components/layout-button'
import { FileTags } from '../_components/tags'

export default function Recent() {
  return (
    <main className='row-layout'>
      <section className='py-4 px-6 flex items-center justify-between gap-3'>
        <h2 className='text-xl font-semibold'>Recent</h2>
        <div className='flex gap-2'>
          <LayoutButton />
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
          >
            <ListFilter className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            className='flex items-center'
            variant='secondary'
          >
            <FolderSyncIcon className='h-4 w-4' />
          </Button>
        </div>
      </section>
      <FileTags />
      <section>
        <h2 className='py-4 pt-6 px-6 font-semibold'>Last 24h</h2>
        <h2 className='py-4 px-6 font-semibold'>Last week</h2>
      </section>
    </main>
  )
}
