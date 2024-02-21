'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Expand } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { cn } from '@/lib/utils'

export type ChartCardProps = {
  children: React.ReactNode
  className?: string
}

const ChartCard: React.FC<ChartCardProps> = ({ children, className }) => {
  const [open, setOpen] = useState(false)

  return (
    <Card className={cn(className)}>
      {/* <CardHeader className="flex flex-row justify-end items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button size="icon" variant="ghost">
              <Expand />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-10 pt-14">{children}</DialogContent>
        </Dialog>
      </CardHeader> */}
      <CardContent className='m-5'>{children}</CardContent>
    </Card>
  )
}

export default ChartCard
