'use client'

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

export const description = 'A radial chart with text'

const chartConfig = {
  memory: {
    label: 'Memory'
  },
  mem_usage: {
    label: 'Memory usage',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

export function MemoryChart({ totalMemory, freeMemory }: { totalMemory: number; freeMemory: number }) {
  const chartData = [
    { memory: Math.round(((totalMemory - freeMemory) / totalMemory) * 100), fill: 'var(--color-mem_usage)' }
  ]

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[340px] w-full flex flex-col'
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={90 - chartData[0].memory * 3.6}
        innerRadius={120}
        outerRadius={170}
      >
        <PolarGrid
          gridType='circle'
          radialLines={false}
          stroke='none'
          className='first:fill-muted last:fill-background'
          polarRadius={[126, 114]}
        />
        <RadialBar
          dataKey='memory'
          background
          cornerRadius={10}
        />
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-foreground text-5xl font-bold'
                    >
                      {chartData[0].memory.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 32}
                      className='fill-muted-foreground'
                    >
                      % Memory used
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
