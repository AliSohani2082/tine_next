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
    id: 'نام',
    enableHiding: false,
    header: ({ column }) => <SortingButton hideOption={false} column={column} title="نام" />,
  },
  {
    accessorKey: 'documentPublished',
    id: 'تعداد مقالات',
    header: ({ column }) => (
      <SortingButton column={column} title="تعداد مقالات" />
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
