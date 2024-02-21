'use client'

import { usePathname, useRouter } from 'next/navigation'

import { useDatabase } from '@/hooks/use-databases'
import { Button } from '@/components/ui/button'
import { Database, Plus } from 'lucide-react'

const DatabaseList = () => {
  const { databases } = useDatabase()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      {databases.map((database) => (
        <Button
          key={database.id}
          variant="ghost"
          onClick={() => router.push(`/dashboard/database/${database.id}`)}
          className="h-16 flex justify-between m-2"
        >
          <h2 className="w-full">{database.name}</h2>
          <Database />
        </Button>
      ))}
      <Button
        onClick={() => router.push(`${pathname}/create`)}
        className="h-16 flex justify-center items-center m-2 justify-self-end"
      >
        <Plus />
      </Button>
    </>
  )
}

export default DatabaseList
