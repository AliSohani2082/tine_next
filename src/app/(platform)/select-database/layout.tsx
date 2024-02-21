import { Card } from '@/components/ui/card'
import { CardContent } from '@mui/material'
import React from 'react'

type SelectDatabaseProps = {
  children: React.ReactNode
}

const SelectDatabaseLayout: React.FC<SelectDatabaseProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[600px] h-[600px] shadow-lg">{children}</Card>
    </div>
  )
}

export default SelectDatabaseLayout
