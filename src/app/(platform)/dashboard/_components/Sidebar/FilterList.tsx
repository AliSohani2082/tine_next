import React from 'react'
import { Book, X, Globe2, Filter, User } from 'lucide-react'

import SidebarAccordion from './SidebarAccordion'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFilters } from '@/hooks/use-filter'
import { authors, documents, countries } from '@/data/tableData'
import FilterItem from './FilterItem'

type FiltersProps = {}

const FilterList = (props: FiltersProps) => {
  const { filters, remove: removeFilter } = useFilters()
  return (
    <SidebarAccordion value="filter" icon={<Filter />} title="فیلتر ها">
      <Command className="rounded-lg border shadow-md overflow-auto">
        <CommandInput placeholder="جست و جو..." />
        {/* <div className="flex flex-row justify-end items-center gap-2 mt-2 mr-2">
          {["author", "document", "country"].map((type) => (
            <Button
              key={type}
              className={cn(
                "rounded-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-mds focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground border hover:opacity-80",
                categories.includes(type)
                  ? "bg-primary"
                  : "bg-primary-foreground text-muted-foreground border-muted-foreground"
              )}
              onClick={() => {
                if (categories.includes(type)) {
                  setCategories(categories.filter((category) => category!== type));
                } else {
                  setCategories([...categories, type]);
                }
              }}
            >
              {type}
            </Button>
          ))}
        </div> */}
        <CommandEmpty>فیلتری وجود ندارد...</CommandEmpty>
        <CommandGroup className="flex flex-col justify-start items-stretch w-full h-full">
          <ScrollArea>
            {filters.map((filter) => {
              var data
              if (filter.type === 'author') {
                const author = authors.find(
                  (author) => author.id === filter.dataId
                )
                if (author === undefined) return null
                data = author && {
                  title: author.firstName + ' ' + author.lastName,
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
            })}
          </ScrollArea>
        </CommandGroup>
      </Command>
    </SidebarAccordion>
  )
}

export default FilterList
