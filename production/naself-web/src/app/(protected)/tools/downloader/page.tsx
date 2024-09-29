import { OpenInNewWindowIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { GaugeCircle } from '@/components/ui/gauge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

export default function DownloaderPage() {
  return (
    <main className='row-layout flex-col max-w-100dvh h-full'>
      <section className='py-4 px-4 sticky bg-background top-16 w-full z-20'>
        <h2 className='text-xl font-semibold'>Downloader</h2>
        <p className='text-sm pt-1'>
          All files will be downloaded to{' '}
          <Link
            className='dark:text-blue-300 text-blue-500'
            href='/files/all?path=/naself-downloads'
          >
            naself-download
          </Link>{' '}
          folder
        </p>
      </section>
      <section className='w-full h-[calc(100%-4.5rem)] max-sm:h-[calc(100%-4rem)] flex-grow flex-shrink px-4 pt-4'>
        <div className='w-full justify-between flex gap-2'>
          <div className='w-full'>
            <Textarea
              className='bg-input min-h-[10rem]'
              placeholder='Paste your links here, one per line'
            />
          </div>
        </div>
        <div className='flex justify-end mt-2'>
          <Button className='w-full'>Download</Button>
        </div>
        <div className='flex justify-start items-center mt-4 gap-2 text-sm'>
          <Checkbox id='vpn-check' />
          <Label htmlFor='vpn-check'>Use VPN connection</Label>
          <p className='text-secondary-foreground'>
            (You can configure your VPN connection in{' '}
            <Link
              className='dark:text-blue-300 text-blue-500'
              href='/settings/networking'
            >
              Networking
            </Link>{' '}
            page)
          </p>
        </div>
        <div className='flex items-center gap-4 flex-shrink-0 pt-10 justify-between'>
          <h3 className='text font-semibold'>Queue</h3>
          <Button
            size='sm'
            variant='secondary'
          >
            Cancel all
          </Button>
        </div>
        <Table className='mb-16'>
          <TableHeader>
            <TableRow>
              <TableHead>Url</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(25).fill(null).map((_, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>
                  <div className='flex items-center gap-2'>
                    <HoverCard>
                      https://www.youtube.com/watch?v=sEKu8KZz2Kw{' '}
                      <HoverCardTrigger asChild>
                        <Link
                          href='https://www.youtube.com/watch?v=sEKu8KZz2Kw'
                          target='_blank'
                        >
                          <OpenInNewWindowIcon className='w-4 h-4 text-primary' />
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent>Open link in new tab</HoverCardContent>
                    </HoverCard>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <GaugeCircle
                      max={100}
                      noText
                      min={0}
                      className='w-5 h-5 text-xs'
                      value={75}
                      gaugePrimaryColor='#3B82F6'
                      gaugeSecondaryColor='transparent'
                    />
                    75%
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <Button
                    size='sm'
                    variant='secondary'
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  )
}
