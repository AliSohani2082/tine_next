'use client'

import React, { useEffect, useRef, useState } from 'react'
import Chart, {
  ChartConfiguration,
  ChartTypeRegistry,
  TooltipModel,
} from 'chart.js/auto'
import ChartTooltip from './Tooltip'
import { Card } from '../ui/card'
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '../ui/tooltip'

interface ChartProps {
  data: {
    value: number
    label: string
    color: string
  }[]
}

const CustomChart: React.FC<ChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart<'pie', number[], string>>()
  const [tooltipModel, setTooltipModel] = useState<TooltipModel<'pie'> | null>(
    null
  )

  useEffect(() => {
    if (chartRef.current && data.length && data.length) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.map((d) => d.label),
            datasets: [
              {
                data: data.map((d) => d.value),
                backgroundColor: data.map((d) => d.color),
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center"></div>
      <Card className="rounded-2xl p-2 m-3 flex flex-row flex-wrap">
        <TooltipProvider>
          {data.map(({ label, color, value }) => (
            <Tooltip key={label}>
              <TooltipTrigger className="font-primary-Regular flex justify-center items-center my-1.5 gap-x-3">
                <div
                  className="w-4 h-4 ml-4 rounded-sm"
                  style={{ background: color }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-sm">
                  {label}:{value}
                </span>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </Card>
      <canvas ref={chartRef} className="font-mono" />
      {tooltipModel && <ChartTooltip tooltipModel={tooltipModel} />}
    </div>
  )
}

export default CustomChart
