import React, { ReactElement, cloneElement } from 'react'

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { SidebarItemProps } from './SidebarItem';
import SidebarItem from './SidebarItem';

type SidebarAccordionProps = {
  value: string;
  title: string;
  icon: React.ReactNode;
  items: SidebarItemProps[]
}

const SidebarAccordion: React.FC<SidebarAccordionProps> = ({ value, title, icon, items }) => {
  const newIcon = cloneElement(icon as ReactElement, { className: "m-4 text-primary group-hover:animate-pulse group-[data-state=open]:text-primary"})
  
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="h-14 group">
        <div className="font-medium text-xs flex items-center justify-end mb-1 w-full">
          <span className="pr-2 font-mono text-lg">{title}</span>
          {newIcon}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {items.map((item: SidebarItemProps) => (
          <SidebarItem
            key={item.title}
            {...item}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

export default SidebarAccordion