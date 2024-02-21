'use client'

import { useState, useEffect, useRef } from 'react'
import { BaseItem } from './action-menu'

type PromiseResult<TData extends BaseItem> = {
  res: Promise<[TData[], number]>
  abort: () => void
}

export function mockAPI<TData extends BaseItem>({
  data,
  pagination: { limit = 10, skip = 0 } = { limit: 10, skip: 0 },
  sort: { field: sortField = 'id', order = 'ASC' } = {
    field: 'id',
    order: 'ASC',
  },
  filter: { field: filterField = 'id', value = '' } = {
    field: 'id',
    value: '',
  },
}: {
  data: TData[]
  pagination?: { limit: number; skip: number }
  sort?: { field: keyof TData; order: 'ASC' | 'DESC' }
  filter?: { field: keyof TData; value: unknown }
}): PromiseResult<TData> {
  const episodes = [
    ...data
      .sort((a: TData, b: TData) => {
        const [first, second] =
          order === 'ASC'
            ? [a[sortField], b[sortField]]
            : [b[sortField], a[sortField]]
        if (typeof first === 'string' && typeof second === 'string') {
          return (first as string).localeCompare(second as string)
        }
        return (first as number) - (second as number)
      })
      .filter((item) =>
        item[filterField]
          ? String(item[filterField]).includes(value as string)
          : true
      ),
  ].slice(skip, skip + limit)

  let timeoutId: any

  // Create a Promise immediately and return it:
  const promise = new Promise<[TData[], number]>((resolve, reject) => {
    timeoutId = setTimeout(() => {
      resolve([episodes, episodes.length])
    }, 1000)
  })

  return { res: promise, abort: () => clearTimeout(timeoutId) }
}

export function useMockAPI<TData extends BaseItem>(
  query = '',
  rawData: TData[] = [],
  {
    pagination: { limit = 10, skip = 0 } = { limit: 10, skip: 0 },
    sort: { field: sortField = 'id', order = 'ASC' } = {
      field: 'id',
      order: 'ASC',
    },
    filter: { field: filterField = 'id', value = '' } = {
      field: 'id',
      value: '',
    },
  }: {
    pagination?: { limit: number; skip: number }
    sort?: { field: keyof TData; order: 'ASC' | 'DESC' }
    filter?: { field: keyof TData; value: unknown }
  } = {}
): [TData[], number, boolean] {
  const [data, setData] = useState<TData[]>(rawData)
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    // No need to assign to currentRequest.current anymore:
    const apiPromise = mockAPI<TData>({
      data: data || [],
      pagination: {
        limit,
        skip,
      },
      sort: {
        field: sortField,
        order,
      },
      filter: {
        field: filterField,
        value,
      },
    })

    // Use the returned Promise directly:
    apiPromise.res
      .then(([data, count]) => {
        setData(data)
        setCount(count)
        setLoading(false)
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error fetching data:', error)
      })

    return () => {
      // Enhanced abort method
      if (apiPromise) {
        apiPromise.abort()
      }
    }
  }, [limit, skip, sortField, order, filterField, value])

  return [data, count, loading]
}
