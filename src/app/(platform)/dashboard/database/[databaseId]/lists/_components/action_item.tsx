'use client'

import { cloneElement } from 'react'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface BaseItem {
  id: string
}

type CoreActionItemProp<DataT> = {
  isActive: boolean
  item: DataT
  label: string
  icon: React.ReactNode
  onClick?: (item: DataT) => void
}

function CoreActionItem<DataT>({
  isActive,
  item,
  label,
  icon,
  onClick,
}: CoreActionItemProp<DataT extends BaseItem ? DataT : never>) {
  const newIcon = cloneElement(icon as React.ReactElement, {
    className: cn('h-5 w-5', isActive ? 'text-muted' : 'text-primary'),
  })

  return (
    <Tooltip>
      <TooltipTrigger asChild className="group">
        <Button
          onClick={() => onClick && onClick(item)}
          variant={isActive ? 'reverseOutline' : 'outline'}
          className="h-10 w-10 p-2"
        >
          {newIcon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export type ActionItemProp<DataT> = {
  item: DataT
  isActive: boolean
  label: string
  icon: React.ReactNode
  onClick?: (item: DataT) => void
  wraper?: {
    component: React.ReactNode
    wrap: React.ComponentType<any>
  }
}

export function ActionItem<DataT>({
  isActive,
  item,
  label,
  icon,
  onClick,
  wraper,
}: ActionItemProp<DataT extends BaseItem ? DataT : never>) {
  const coreAction = (
    <CoreActionItem<DataT>
      item={item}
      label={label}
      icon={icon}
      onClick={onClick}
      isActive={isActive}
    />
  )
  return (
    <>
      {wraper ? (
        <wraper.wrap trigger={coreAction}>{wraper.component}</wraper.wrap>
      ) : (
        coreAction
      )}
    </>
  )
}
