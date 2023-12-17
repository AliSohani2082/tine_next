import React from 'react'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

type SortingButtonProps = {
  column: any
  title: string
}

const SortingButton: React.FC<SortingButtonProps> = ({ column, title }) => {
  
  return (
    
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )   
}

export default SortingButton