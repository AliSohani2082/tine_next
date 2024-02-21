import React from 'react'
import { X } from 'lucide-react'

import { CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'

type FoundItemProps = {
  data: {
    icon: React.ReactNode | null
    title: string
  }
}

const FoundItem: React.FC<FoundItemProps> = ({ data }) => {
  return (
    <CommandItem className="border-2 rounded-md  h-10 p-0 px-2 m-1">
      <div className="w-full h-full flex flex-row justify-start items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          {data?.icon}
          {data?.title}
        </div>
      </div>
    </CommandItem>
  )
}

export default FoundItem
