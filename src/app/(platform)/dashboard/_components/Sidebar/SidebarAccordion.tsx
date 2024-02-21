import React, { Children, ReactElement, cloneElement } from 'react'

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { SidebarItemProps } from './SidebarItem'
import SidebarItem from './SidebarItem'

type SidebarAccordionProps = {
  value: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const SidebarAccordion: React.FC<SidebarAccordionProps> = ({
  value,
  title,
  icon,
  children,
}) => {
  const newIcon = cloneElement(icon as ReactElement, {
    className: 'm-4 h-6 w-6',
  })

  return (
    <AccordionItem
      value={value}
      className="group m-4 data-[state=open]:border-2 data-[state=open]:rounded-xl data-[state=open]:m-3 data-[state=open]:border-primary transition h-full"
    >
      <AccordionTrigger className="h-14 flex flex-row-reverse pl-4">
        <div className="font-medium text-xs transition group-data-[state=open]:text-primary flex items-center justify-end mb-1 w-full">
          <span className="pr-2 font-mono text-lg">{title}</span>
          {newIcon}
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}

export default SidebarAccordion
