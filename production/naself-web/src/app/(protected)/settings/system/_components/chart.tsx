'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LineChart, CartesianGrid, XAxis, Line } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartConfig = {
  cpu: {
    label: 'CPU Usage',
    color: '#2563eb'
  },
  time: {
    label: 'Time'
  }
}

export const SystemChart = ({ cpuData }: { cpuData: [Date, number][] }) => {
  const chartData = cpuData.map(([time, cpu]) => ({
    time: time.toLocaleString('en', { hour12: false, hour: 'numeric', minute: '2-digit', second: '2-digit' }),
    cpu
  }))

  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh()
    }, 5000)
    return () => clearInterval(interval)
  }, [router])

  return (
    <ChartContainer
      config={chartConfig}
      className='h-full w-full'
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='time'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
        />
        <ChartTooltip content={<ChartTooltipContent formatter={value => `${value as string}%`} />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey='cpu'
          type='monotone'
          stroke={`var(--color-cpu)`}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
