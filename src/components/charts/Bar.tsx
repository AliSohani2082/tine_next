'use client'

import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto' // Import required types from Chart.js

// Type definitions for data and options
interface BarChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string[]
  }[]
}

interface BarChartOptions {
  responsive: boolean
  maintainAspectRatio: boolean
  title?: {
    display: boolean
    text: string
    fontSize: number
  }
  legend?: {
    display: boolean
    position: 'top' | 'bottom' | 'left' | 'right'
    labels: {
      fontSize: number
    }
  }
  scales?: {
    xAxes?: {
      // Optional x-axis options
      ticks: {
        beginAtZero: boolean // Optional property
      }
    }
    yAxes: [
      {
        // Ensure type compatibility with TimeScaleTickOptions:
        ticks: {
          beginAtZero: true
          // Add a placeholder for other TimeScaleTickOptions if needed:
          // ...otherTimeScaleTickOptions,
        }
      }
    ]
  }
}

const BarChartComponent: React.FC<BarChartData & BarChartOptions> = ({
  labels,
  datasets,
  responsive = true,
  maintainAspectRatio = false,
  title,
  legend,
  scales,
  ...rest
}) => {
  const [chartData, setChartData] = useState<BarChartData>({
    labels,
    datasets,
  })

  useEffect(() => {
    setChartData({
      labels,
      datasets,
    })
  }, [labels, datasets])

  return (
    <Bar
      data={chartData}
      options={{
        responsive,
        maintainAspectRatio,
        // title,
        // legend,
        // scales,
        ...rest, // Allow passing additional options
      }}
    />
  )
}

export default BarChartComponent
