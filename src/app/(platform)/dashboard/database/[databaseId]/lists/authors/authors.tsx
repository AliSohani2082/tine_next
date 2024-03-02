'use client'

import { useState, useEffect } from 'react'
import { AuthorTable, columns } from './columns'
import { DataTable } from '../_components/data-table'
import { authors } from '@/data/dataAdaptor'
import Lottie from 'react-lottie'
import dots from 'public/assets/animation/dots.json'

async function getData(): Promise<AuthorTable[]> {
  // Fetch data from your API here.
  const authorTable = authors.map(
    (author): AuthorTable => ({
      id: author.id.toString(),
      name: author.name,
      organization: author.organization,
    })
  )
  return authorTable
}

export default function Authors() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AuthorTable[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData()
      setData(fetchedData)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Lottie
            options={{ animationData: dots, loop: true }}
            width={272}
            height={272}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={data} title="نویسنده" />
      )}
    </div>
  )
}
