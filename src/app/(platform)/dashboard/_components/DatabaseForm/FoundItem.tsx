'use client'

import React from 'react'
import { Book, User, X } from 'lucide-react'

import { Document } from '@/types/items'
import { CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useDownSlider } from '@/hooks/use-downSlider'

type FoundItemProps = {
  data: Document
}

const FoundItem: React.FC<FoundItemProps> = ({ data }) => {
  const { onOpen } = useDownSlider()

  return (
    <Card
      className="my-4 mx-10 rounded-xl hover:cursor-pointer"
      onClick={() => onOpen({ id: data.id, type: 'document' })}
    >
      <CardHeader className="w-full flex flex-row justify-between items-center">
        <Book size={20} />
        <Tooltip>
          <TooltipTrigger>
            <h2 className="truncate w-[350px] font-semibold">{data.title}</h2>
          </TooltipTrigger>
          <TooltipContent>
            <h2 className="w-[350px] font-semibold">{data.title}</h2>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className="flex items-center justify-center">
            <User size={14} />
            <span className="ml-2">{data.authors.length}</span>
          </TooltipTrigger>
          <TooltipContent className="min-w-[150px] flex flex-col justify-start items-end gap-2">
            <span className="my-2">:نام نویسندگان</span>
            <div className="flex w-full flex-col justify-start items-start">
              {data.authors.map((author) => (
                <span key={author.name}>{author.name}</span>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="relative flex-1 flex flex-col justify-start items-start gap-4">
        <span className="font-bold text-base">Anstract</span>
        <span className="max-h-[100px] overflow-clip bg-clip-text text-transparent bg-gradient-to-t from-transparent to-black dark:to-gray-500">
          {data.abstract}
        </span>
      </CardContent>
    </Card>
  )
}

export default FoundItem
