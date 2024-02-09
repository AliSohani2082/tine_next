'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Expand, X } from 'lucide-react'

export type ChartCardProps = {
  modalMode: false
  onModalOpen?: never
  children: React.ReactNode
} | {
  modalMode: true
  onModalOpen: () => void
  children: React.ReactNode
};

const ChartCard: React.FC<ChartCardProps> = ({ children, onModalOpen, modalMode }) => {
  if(!modalMode) return children
  return (
    <Card className='flex flex-col justify-start items-end'>
      <CardHeader>
        <Button
          size="icon"
          variant="ghost"
          onClick={onModalOpen}
        >
          <Expand/>
        </Button>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default ChartCard