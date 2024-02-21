'use client'

import React, { FC, useId, useRef, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'

const shadow_custom_world_map = 'shadow-md'

// import "/node_modules/flag-icons/css/flag-icons.min.csss";

const legends: { color: string; name: string; min: number; max?: number }[] = [
  { color: '#451563', name: 'بیش از ۱۰۰۰', min: 1000, max: undefined }, // Red for the highest category
  { color: '#AC92BC', name: '۵۰۰ - ۱۰۰۰', min: 500, max: 1000 }, // Orange
  { color: '#DDC9EA', name: '۱۰۰ - ۵۰۰', min: 100, max: 500 }, // Yellow
  { color: '#F7E9FF', name: '۵۰ - ۱۰۰', min: 50, max: 100 }, // Green
  { color: '#e4e7ec', name: '۰ - ۵۰', min: 0, max: 50 }, // Blue for the lowest category
]

import geoUrl from './country.json'
import { Plus, Minus, Target } from 'lucide-react'
// import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipRefProps, Tooltip } from 'react-tooltip'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { countries } from '@/data/tableData'
import { useDownSlider } from '@/hooks/use-downSlider'

interface WorldMapProps {
  width?: number
  height?: number
  data: Record<string, number>
}

const WorldMap: React.FC<WorldMapProps> = ({ data, width, height }) => {
  const newGeoUrl = {
    ...geoUrl,
    objects: {
      world: {
        type: geoUrl.objects.world.type,
        geometries: geoUrl.objects.world.geometries.map((geo) => ({
          ...geo,
          properties: {
            ...geo.properties,
            color: legends.find(
              (legend) =>
                legend.min <= (data[geo.properties.name] ||0) &&
                  (!legend.max
                    ? true
                    : legend.max > (data[geo.properties.name] || 0))
            )?.color,
          },
        })),
      },
    },
  }

  const { onOpen, onClose } = useDownSlider()
  let tooltip = useRef<TooltipRefProps>(null)

  const [tooltipContent, setTooltipContent] = useState<string>()
  const [position, setPosition] = useState<{
    coordinates: [number, number]
    zoom: number
  }>({
    coordinates: [81, 13],
    zoom: 1.75,
  })

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((prev) => ({ ...prev, zoom: prev.zoom + 0.5 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1){
      return setPosition((prev) => ({ ...prev, zoom: prev.zoom - 0.5 }))
    }
  }

  const handleCenter = () => {
    setPosition({ zoom: 1.75, coordinates: [81, 13] })
  }

  const handleMoveEnd = (position: {
    coordinates: [number, number]
    zoom: number
  }) => {
    setPosition(position)
  }

  const id = useId()
  return (
    <div className='relative'>
      {/* Map 🗺️ */}
      <ComposableMap
        width={width}
        height={height}
        projection="geoMercator"
      >
        <ZoomableGroup

          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={newGeoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      const id = countries.find((country) => country.name === geo.properties.name)?.id 
                      if(id){
                        onOpen({
                        id: id,
                          type: "country" 
                        })
                      }
                    }}
                    onMouseEnter={() => {
                      document.body.classList.add('target')
                      setTooltipContent(geo.properties.name)
                    }}
                    onMouseLeave={() => {
                      document.body.classList.remove('target')
                    }}
                    fill={geo.properties.color}
                    stroke="#bec1c4"
                    strokeWidth="0.5"
                    className="focus:outline-none"
                    data-tooltip-id={id}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {/* Tooltip💡 */}
      {tooltipContent && (
        <Tooltip
          ref={tooltip}
          id={id}
          float
          className={`!p-2 !rounded-lg !bg-white !dark:bg-slate-800 !text-inherit ${shadow_custom_world_map} select-none z-10`}
          opacity={1}
        >
          <div className="flex gap-x-5">
            <div className="flex justify-center items-center">
              <p className="font-primary-Regular font-bold ">
                {tooltipContent}
              </p>
            </div>
            <div>
              <small className="font-primary-Regular">تعداد مقالات</small>
              <p className="text-sm font-primary-Regular">
                {data[tooltipContent] || 0}
              </p>
            </div>
          </div>
        </Tooltip>
      )}
      {/* Zoom in-out 🔍🔎 */}
      <div className="absolute right-0 bottom-0">
        <Card
          className={` rounded-lg p-2 mx-3 my-1 ${shadow_custom_world_map}`}
        >
          <Button
            variant="none"
            className="block p-1 pb-2"
            title="zoom in"
            type="button"
            onClick={handleZoomIn}
          >
            <Plus />
          </Button>
          <Button
            variant="none"
            className="block p-1 pt-2"
            title="zoom out"
            type="button"
            onClick={handleZoomOut}
          >
            <Minus />
          </Button>
        </Card>

        <Button
          variant="outline"
          title="center"
          type="button"
          onClick={handleCenter}
          className={`p-3 mx-3 mt-1 mb-2 rounded-lg float-right ${shadow_custom_world_map}`}
        >
          <Target />
        </Button>
      </div>
      {/* Legends 📑 */}
      <Card
        className={`absolute right-0 top-0 rounded-2xl p-2 m-3 ${shadow_custom_world_map}`}
      >
        {legends.map(({ color, name }) => {
          return (
            <div
              key={color}
              className="font-primary-Regular flex justify-end items-center my-1.5 gap-x-3"
            >
              <span className="text-sm">{name}</span>
              <div
                className="w-4 h-4 rounded-sm"
                style={{ background: color }}
              />
            </div>
          )
        })}
      </Card>
    </div>
  )
}

export default WorldMap
