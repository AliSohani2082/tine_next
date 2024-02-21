'use client'

import { ColumnDef } from '@tanstack/react-table'

import { ActionMenu, BaseItem } from '../_components/action-menu'
import SortingButton from '../_components/sortingButton'

export interface CountryTable extends BaseItem {
  name: string
  documentPublished: number
}

export const columns: ColumnDef<CountryTable>[] = [
  {
    accessorKey: 'name',
    id: 'Name',
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="Name" />,
  },
  {
    accessorKey: 'documentPublished',
    id: 'Published documents',
    header: ({ column }) => (
      <SortingButton column={column} title="Published Documents" />
    ),
  },
  {
    id: 'Actions',
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const country = row.original

      return <ActionMenu item={country} type="country" />
    },
  },
]
