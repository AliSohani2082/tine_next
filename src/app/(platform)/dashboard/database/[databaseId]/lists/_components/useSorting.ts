'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { BaseItem } from './action-menu'
import { SortingState } from '@tanstack/react-table'

export function useSorting<DataT extends BaseItem>(
  initialField: keyof DataT = 'id',
  initialOrder: 'ASC' | 'DESC' = 'ASC'
): {
  sorting: SortingState
  onSortingChange: Dispatch<SetStateAction<SortingState>>
  order: 'ASC' | 'DESC'
  field: keyof DataT
} {
  const [sorting, setSorting] = useState<SortingState>([
    { id: initialField as string, desc: initialOrder === 'DESC' },
  ])

  return {
    sorting,
    onSortingChange: setSorting,
    order: !sorting.length ? initialOrder : sorting[0].desc ? 'DESC' : 'ASC',
    field: sorting.length ? (sorting[0].id as keyof DataT) : initialField,
  }
}
