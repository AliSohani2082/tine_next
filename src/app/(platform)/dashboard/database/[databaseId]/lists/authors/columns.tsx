'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Eye, Filter } from 'lucide-react'

import { ActionMenu, BaseItem } from '../_components/action-menu'
import SortingButton from '../_components/sortingButton'
import ShowMoreDrawer from '../_components/showMoreDrawer'
import { ActionItemProp } from '../_components/action_item'
import { toast } from 'sonner'

export interface AuthorTable extends BaseItem {
  name: string
}

export const columns: ColumnDef<AuthorTable>[] = [
  {
    accessorKey: 'name',
    id: 'Full Name',
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="Full Name" />,
  },
  {
    id: 'Actions',
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const author = row.original
      return <ActionMenu item={author} type="author" />
    },
  },
]
