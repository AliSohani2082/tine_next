'use client'

import React from 'react'
import { Filter, MoreHorizontal, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useDownSlider } from '@/hooks/use-downSlider'
import { useFilters } from '@/hooks/use-filter'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { useFilters } from '@/hooks/use-filter'
import { v4 as uuidv4 } from 'uuid'
import CountrySlider from './Country'
import AuthorSlider from './Author'
import DocumentSlider from './Document'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type SliderProps = {}

const Slider: React.FC<SliderProps> = (props) => {
  const { isOpen, onClose, item } = useDownSlider()
  const { add: addFilter, remove: removeFilter, filters } = useFilters()

  if (!item) {
    return null
  }
  const filterId = uuidv4()
  const isFilter = filters.some(
    (filter) => filter.dataId === item.id && filter.type === item.type
  )

  const toggleFilter = () => {
    if (isFilter) {
      removeFilter(
        filters.find(
          (filter) =>
            filter.dataId === item.id && filter.type === item.type
        )?.id || ''
      )
    } else {
      addFilter({ dataId: item.id, type: item.type, id: uuidv4() })
    }
  }

  return (
    <Card
      className={cn(
        'transition-h duration-700 ease-in-out flex flex-col justify-start items-stretch',
        isOpen ? 'h-[280px] hover:h-[500px]' : 'h-0'
      )}
    >
      <CardHeader className="w-full flex flex-row justify-end h-4 mb-2 items-center gap-2">
        <TooltipProvider>
          {item.type === "document" && (
            <>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost">
                    <MoreHorizontal/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  مشاهده بیشتر سند
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={isFilter ? 'default' : 'ghost'}
                    onClick={() => toggleFilter()}
                  >
                    <Filter/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  اضافه کردن سند به فیلتر
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </TooltipProvider>
        <Button variant="ghost" onClick={onClose}>
          <X />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex justify-between items-center">
        {item.type === 'country' ? (
          <CountrySlider id={item.id} />
        ) : item.type === 'author' ? (
          <AuthorSlider id={item.id} />
        ) : item.type === 'document' ? (
          <DocumentSlider id={item.id} />
        ) : (
          <span>{item.id}</span>
        )}
      </CardContent>
      {/* <CardFooter className="flex flex-row justify-end items-center w-full">
        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            variant={isFilter ? 'default' : 'outline'}
            onClick={() => {
              if (isFilter) {
                removeFilter(
                  filters.find(
                    (filter) =>
                      filter.dataId === item.id && filter.type === item.type
                  )?.id || ''
                )
              } else {
                addFilter({ dataId: item.id, type: item.type, id: uuidv4() })
              }
            }}
            className="flex flex-row justify-between items-center"
          >
            <span>فیلتر</span>
            {isFilter ? <Minus /> : <Plus />}
          </Button>
          <Button>مشاهده بیشتر</Button>
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default Slider
