'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Book, Database, Filter, Globe2, User, X } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Accordion } from '@/components/ui/accordion'
import { useDatabase } from '@/hooks/use-databases'
import { Separator } from '@/components/ui/separator'
import { IDatabase, INewDatabase } from '@/types'
import SidebarItem from './SidebarItem'
import SidebarAccordion from './SidebarAccordion'
import { useFilters } from '@/hooks/use-filter'
import FilterList from './FilterList'

interface SidebarProps {
  storageKey?: string
}

const Sidebar: React.FC<SidebarProps> = ({
  storageKey = 't-sidebar-state',
}) => {
  let pathname = usePathname()
  const databaseId = pathname.startsWith('/dashboard/database')
    ? pathname.split('/')[3]
    : undefined
  console.log('databaseId: ', databaseId)
  const { databases } = useDatabase()

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }
      return acc
    },
    []
  )

  return (
    <div className="h-full w-[400px] flex flex-col border-l-2 shadow-lg justify-between items-stretch">
      <div className="flex-col justify-start items-stretch">
        <div className="flex justify-center items-center mt-3">
          <Link href="/">
            <div className="flex flex-row justify-center gap-4 items-center">
              <p className="pb-1 text-3xl">علم سنجی</p>
              <Image
                src="/assets/icons/logo.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>
          </Link>
        </div>
        <Separator className="my-4 w-full" />
        <Accordion
          type="multiple"
          defaultValue={defaultAccordionValue}
          className="space-y-2 flex-1 overflow-auto flex flex-col"
        >
          <SidebarAccordion
            value="database"
            icon={<Database />}
            title="دیتابیس ها"
          >
            {[
              {
                title: 'ایجاد دیتابیس جدید',
                to: '/dashboard',
                selected: true,
                id: null,
              },
              ...databases?.map((database: IDatabase) => ({
                title: database.name,
                to: `/dashboard/database/${database.id}`,
                selected: databaseId === database.id,
                id: database.id,
              })),
            ].map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </SidebarAccordion>
          {pathname.split('/')[2] === 'database' && <FilterList />}
          <div />
        </Accordion>
      </div>
    </div>
  )
}

export default Sidebar
