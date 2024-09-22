import { SystemChart } from './_components/chart'
import { DetailsTable } from './_components/details-table'
import { MemoryChart } from './_components/memory-chart'
import { getSystemStats } from './utils'

export const dynamic = 'force-dynamic'

export default function SystemPage() {
  const systemUtilization = getSystemStats()

  return (
    <main className='row-layout flex-col max-w-100dvh'>
      <section className='py-4 px-4 flex items-center justify-between gap-3 flex-shrink-0'>
        <h2 className='text-xl font-semibold'>System</h2>
      </section>
      <section className='px-4 w-full flex flex-col gap-4 flex-shrink flex-wrap pb-16'>
        <div className='flex gap-4 items-stretch flex-wrap w-full'>
          <div className='border rounded-md h-auto flex-auto'>
            <DetailsTable systemUtilization={systemUtilization} />
          </div>
          <div className='border rounded-md h-auto flex-auto min-w-10'>
            <MemoryChart
              totalMemory={systemUtilization.totalMemoryBytes}
              freeMemory={systemUtilization.freeMemoryBytes}
            />
          </div>
        </div>
        <div className='border rounded-md flex-auto h-[40rem] w-full max-lg:h-96'>
          <SystemChart cpuData={systemUtilization.cpuUsagePercentLast50Entrires} />
        </div>
      </section>
    </main>
  )
}
