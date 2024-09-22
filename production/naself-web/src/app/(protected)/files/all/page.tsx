import { ArrowUpIcon, FolderSyncIcon, HomeIcon, ListFilter } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { CreateButton } from '../_components/create-button'
import { LayoutButton } from '../_components/layout-button'
import { FileTags } from '../_components/tags'

export default function AllFiles() {
  return (
    <main className='row-layout'>
      <section className='py-4 px-6 flex items-center justify-between gap-3'>
        <div className='flex items-center'>
          <ArrowUpIcon className='mr-6 cursor-pointer hover:text-sky-400 flex-shrink-0' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href='/files/all'
                  className='flex items-center'
                >
                  <HomeIcon className='w-4 h-4 mr-2 stroke-accent-foreground' /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/files/all?path=components'>Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Design</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='flex gap-2'>
          <CreateButton />
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
      <h2 className='px-6 text-xl font-semibold'>Design</h2>
      <p className='pb-3 px-6 text-sm'>3 files</p>
      <FileTags />
      <section></section>
    </main>
  )
}
