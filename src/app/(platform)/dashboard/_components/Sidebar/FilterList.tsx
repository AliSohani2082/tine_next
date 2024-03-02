import React from 'react'
import { Book, Globe2, Filter, User } from 'lucide-react'

import SidebarAccordion from './SidebarAccordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFilters } from '@/hooks/use-filter'
import { documents, countries, authors } from '@/data/dataAdaptor'
import FilterItem from './FilterItem'

const FilterList = () => {
  const { filters, remove: removeFilter } = useFilters()
  return (
    <SidebarAccordion value="filter" icon={<Filter />} title="فیلتر ها">
      {/* <Command className="rounded-lg border shadow-md overflow-auto"> */}
      {/* <CommandEmpty>فیلتری وجود ندارد...</CommandEmpty> */}
      <ScrollArea>
        {filters.length === 0 ? (
          <span className="flex justify-center items-center w-full h-full">
            فیلتری وجود ندارد...
          </span>
        ) : (
          filters.map((filter) => {
            var data
            if (filter.type === 'author') {
              const author = authors.find(
                (author) => author.id === filter.dataId
              )
              if (author === undefined) return null
              data = author && {
                title: author.name,
                icon: <User />,
              }
            } else if (filter.type === 'document') {
              const document = documents.find(
                (document) => document.id === filter.dataId
              )
              if (document === undefined) return null
              data = document && {
                title: document.title,
                icon: <Book />,
              }
            } else if (filter.type === 'country') {
              const country = countries.find(
                (country) => country.id === filter.dataId
              )
              if (country === undefined) return null
              data = {
                title: country.name,
                icon: <Globe2 />,
              }
            }
            if (data)
              return (
                <FilterItem
                  data={data}
                  filter={filter}
                  removeFilter={removeFilter}
                  key={filter.id}
                />
              )
          })
        )}
      </ScrollArea>
      {/* <CommandGroup className="flex flex-col justify-start items-stretch w-full h-full">
        </CommandGroup>
      </Command> */}
    </SidebarAccordion>
  )
}

export default FilterList
