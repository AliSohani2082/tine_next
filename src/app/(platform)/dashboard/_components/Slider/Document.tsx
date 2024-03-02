'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { documents } from '@/data/dataAdaptor'
import { cn, numberToLetter } from '@/lib/utils'
import {
  ChevronDown,
  ChevronUp,
  Minus,
  MoreHorizontal,
  Plus,
} from 'lucide-react'
import { useDownSlider } from '@/hooks/use-downSlider'
import { Separator } from '@/components/ui/separator'
import { useFilters } from '@/hooks/use-filter'
import { Badge } from '@/components/ui/badge'

type DocumentSliderProps = {
  id: string
}

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar massa eget nisi rutrum fermentum. Phasellus ultricies tortor et libero convallis, quis auctor risus egestas. Integer neque mi, mattis nec tortor a, imperdiet euismod ipsum. Nam id dolor a diam pretium tincidunt a nec velit. Phasellus fermentum, ante vitae pellentesque semper, justo lacus gravida sem, a luctus nulla orci a enim. Quisque accumsan tellus odio, ut pharetra mauris faucibus a. Fusce tempus fermentum odio, vitae placerat justo pulvinar at. Etiam facilisis orci imperdiet metus tempus, vitae condimentum lectus volutpat. Ut suscipit, metus eu vestibulum ullamcorper, sem lorem molestie ex, non luctus arcu est porttitor quam. Aliquam erat volutpat. Vivamus consectetur euismod lacinia. '

const DocumentSlider: React.FC<DocumentSliderProps> = ({ id }) => {
  const document = documents.find((document) => document.id.toString() === id)
  // console.log(document?.authors)

  const { onOpen } = useDownSlider()
  const { add: addFilter, remove: removeFilter, filters } = useFilters()
  const [showMore, setShowMore] = useState(false)

  if (!document) return <div>Document not found</div>

  const filterId = uuidv4()
  const isFilter = filters.some(
    (filter) => filter.dataId === document?.id && filter.type === 'document'
  )
  const items = [
    {
      key: 'عنوان اصلی',
      value: document.title,
    },
    {
      key: 'تعداد ارجاعات',
      value: document.citation_count,
    },
    {
      key: 'نویسنده',
      value: document.authors.map((author) => author.name).join(', '),
    },
  ]
  return (
    <div className="h-full w-full gap-8 flex justify-stretch items-stretch flex-row">
      <ScrollArea>
        <span className="text-3xl pb-4">{document.title}</span>
        <div className="w-full flex flex-row flex-wrap justify-start items-center gap-1">
          {document.authors.map((author, index) => (
            <Button
              key={index}
              onClick={() => onOpen({ id: author.id, type: 'author' })}
              variant="link"
              className="m-0 p-0 h-auto"
            >
              <span>
                {author.name}
                <sup className="no-underline">{numberToLetter(index + 1)}</sup>
                <span className="no-underline">,</span>
              </span>
            </Button>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <Button
            onClick={() => setShowMore(!showMore)}
            variant="ghost"
            className="mb-2"
          >
            <span>مشاهده بیشتر</span>
            {!showMore ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        <div className={cn('mx-3', !showMore ? 'hidden' : '')}>
          <div className="w-full pb-4 flex flex-col justify-start itemx-start">
            {document.authors.map((author, index) => (
              <span key={index} className="text-sm">
                {numberToLetter(index + 1)}
                {'. '}
                {author.organization}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-6 flex flex-row justify-start items-center gap-2 w-full">
          <Button
            className="flex flex-row justify-center items-center gap-1"
            variant="ghost"
          >
            <MoreHorizontal />
            مشاهده مقاله
          </Button>
          <Button
            variant={isFilter ? 'default' : 'ghost'}
            onClick={() => {
              if (isFilter) {
                removeFilter(
                  filters.find(
                    (filter) =>
                      filter.dataId === document.id &&
                      filter.type === 'document'
                  )?.id || ''
                )
              } else {
                addFilter({
                  dataId: document.id,
                  type: 'document',
                  id: uuidv4(),
                })
              }
            }}
            className="flex flex-row justify-between items-center gap-1"
          >
            {isFilter ? <Minus /> : <Plus />}
            <span>اضافه کردن به فلتر</span>
          </Button>
        </div>
        <Separator className="mt-2" />
        <article className="flex flex-col mx-4 items-start justify-center">
          <h1 className="text-2xl my-6">Abstract</h1>
          <p>{document?.abstract || lorem}</p>
        </article>
        <Separator className="my-6" />
        <div className="flex flex-col justify-center items-end">
          <span className="text-2xl mx-3">کلمات کلیدی</span>
          <div className="flex flex-row justify-start items-center flex-wrap gap-1 m-5">
            {document.keywords.map((keyword) => (
              <Badge key={keyword}>{keyword}</Badge>
            ))}
          </div>
        </div>
      </ScrollArea>
      {/* <div className='w-1/3'></div> */}
    </div>
  )
}

export default DocumentSlider
