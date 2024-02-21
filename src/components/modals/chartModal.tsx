'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

type ChartModalProps = {
  onClose: () => void
  isOpen: boolean
  loading?: boolean
  children: React.ReactNode
}

const ChartModal: React.FC<ChartModalProps> = ({
  onClose,
  isOpen,
  loading = false,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default ChartModal
