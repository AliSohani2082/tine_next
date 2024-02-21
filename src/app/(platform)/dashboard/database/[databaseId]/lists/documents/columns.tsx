'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Copy, Eye, Filter } from 'lucide-react'

import { ActionMenu, BaseItem } from '../_components/action-menu'
import SortingButton from '../_components/sortingButton'
import { ActionItemProp } from '../_components/action_item'
import ShowMoreDrawer from '../_components/showMoreDrawer'
import { toast } from 'sonner'

export interface DocumentTable extends BaseItem {
  title: string
  publisher: string
  author: string
}

const Content = () => {
  return (
    <span className="h-[250px] flex justify-center items-center">Content</span>
  )
}

export const columns: ColumnDef<DocumentTable>[] = [
  {
    accessorKey: 'title',
    id: 'Title',
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="Title" />,
  },
  {
    accessorKey: 'publisher',
    id: 'Publisher',
    header: ({ column }) => <SortingButton column={column} title="Publisher" />,
  },
  {
    accessorKey: 'author',
    id: 'Author',
    header: ({ column }) => <SortingButton column={column} title="Author" />,
  },
  {
    id: 'Actions',
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const document = row.original
      const acditionalActions: ActionItemProp<DocumentTable>[] = [
        {
          item: document,
          isActive: false,
          label: 'کپی کردن لینک',
          icon: <Copy />,
          onClick: (document: DocumentTable) => {
            navigator.clipboard.writeText(document.title)
            toast.success('لینک کپی شد')
          },
        },
      ]

      return (
        <ActionMenu
          item={document}
          type="document"
          aditionalActions={acditionalActions}
        />
      )
    },
  },
]
