'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

type RedirectLinkProps = {
  link: string
  children?: React.ReactNode
}

const RedirectLink: React.FC<RedirectLinkProps> = ({ link, children }) => {
  return (
    <Button variant="outline" onClick={() => window.open(link, '_blank')}>
      {children}
    </Button>
  )
}

export default RedirectLink
