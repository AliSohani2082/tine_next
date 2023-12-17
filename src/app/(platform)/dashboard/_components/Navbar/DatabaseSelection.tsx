"use client"

import * as React from "react"
import { ChevronsUpDown, Database, Plus } from "lucide-react"
import { redirect } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDatabase } from "@/hooks/use-databases"
import { IDatabase } from "@/types"

export function DatabaseSelection({ databaseId }: { databaseId: string|undefined }) {
  const { databases } = useDatabase()
 
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<IDatabase|undefined>(databaseId ? databases.find(db => db.id === databaseId) : undefined)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] h-[50px] justify-between"
        >
          <Database className="mr-2 h-6 w-6 text-primary"/>
          {value
            ? value.name
            : "یک دیتابیس انتخاب کنید"
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="جست و جو در دیتابیس ها" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="ایجاد دیتابیس جدید"
              className="flex items-center justify-end py-4 cursor-pointer group"
              onSelect={() => {
                redirect("/dashboard")
              }} 
            >
              <span>ایجاد دیتابیس جدید</span>
            <Plus
              className={cn(
                "mr-2 h-6 w-6 mx-4 text-muted-foreground group-hover:text-primary",
              )}
            />   
            </CommandItem>
            {databases.filter((db) => value ? db.id !== value.id : true).map((database) => (
              <CommandItem
                key={database.id}
                value={database.name}
                className="flex items-center justify-end py-4 group"
                onSelect={(currentValue) => {
                  setOpen(false)
                  setValue(databases.find(db => db.name === currentValue))
                  redirect(`/daashboard/database/${databaseId}`)
                }}
              >
                {database.name}
                <Database
                  className={cn(
                    "mr-2 h-6 w-6 mx-4 text-muted-foreground group-hover:text-primary",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
