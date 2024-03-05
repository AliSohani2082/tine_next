import { Card } from '@/components/ui/card'
import { CardContent } from '@mui/material'
import React from 'react'

type SelectDatabaseProps = {
  children: React.ReactNode
}

const SelectDatabaseLayout: React.FC<SelectDatabaseProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      {children}
    </div>
  )
}

export default SelectDatabaseLayout
