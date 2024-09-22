import { SystemChart } from './_components/chart'
import { MemoryChart } from './_components/memory-chart'
import { getSystemStats } from './utils'

export const dynamic = 'force-dynamic'

export default async function SystemPage() {
  const systemUtilization = await getSystemStats()

  return (
    <main className='row-layout flex-col max-w-100dvh'>
      <section className='py-4 px-6 flex items-center justify-between gap-3 flex-shrink-0'>
        <h2 className='text-xl font-semibold'>System</h2>
      </section>
      <section className='px-6 w-full flex flex-col gap-4 flex-shrink flex-wrap'>
        <div className='flex gap-4 items-stretch flex-wrap w-full'>
          <div className='border rounded-md h-auto flex-auto'>
            <ul className='divide-y divide-border'>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>Platform:</span> {systemUtilization.platform}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>Architecture:</span> {systemUtilization.architecture}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>CPU:</span> {systemUtilization.cpu}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>CPU Cores:</span> {systemUtilization.cpuCores}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>CPU Usage:</span> {systemUtilization.cpuUsage}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>Total Memory:</span> {systemUtilization.totalMemory}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>Free Memory:</span> {systemUtilization.freeMemory}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>Memory Usage:</span> {systemUtilization.memoryUsage}
              </li>
              <li className='p-2 flex justify-between gap-2 text-right text-sm'>
                <span className='font-semibold'>Uptime:</span> {systemUtilization.uptime}
              </li>
            </ul>
          </div>
          <div className='border rounded-md h-auto flex-auto'>
            <MemoryChart
              totalMemory={systemUtilization.totalMemoryBytes}
              freeMemory={systemUtilization.freeMemoryBytes}
            />
          </div>
        </div>
        <div className='border rounded-md flex-auto h-96 w-full'>
          <SystemChart cpuData={systemUtilization.cpuUsagePercentLast50Entrires} />
        </div>
      </section>
    </main>
  )
}
