'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Copy } from 'lucide-react'

import { ActionMenu, BaseItem } from '../_components/action-menu'
import SortingButton from '../_components/sortingButton'
import { ActionItemProp } from '../_components/action_item'
import { toast } from 'sonner'

export interface DocumentTable extends BaseItem {
  title: string
  citation: number
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
    id: 'عنوان',
    enableHiding: false,
    header: ({ column }) => <SortingButton column={column} title="عنوان" />,
  },
  {
    accessorKey: 'author',
    id: 'نویسنده',
    header: ({ column }) => <SortingButton column={column} title="نویسنده" />,
  },
  {
    accessorKey: 'citation',
    id: 'تعداد ارجاعات',
    header: ({ column }) => (
      <SortingButton column={column} title="تعداد ارجاعات" />
    ),
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
          label: 'کپی کردن نام',
          icon: <Copy />,
          onClick: (document: DocumentTable) => {
            navigator.clipboard.writeText(document.title)
            toast.success('نام مقاله کپی شد')
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
