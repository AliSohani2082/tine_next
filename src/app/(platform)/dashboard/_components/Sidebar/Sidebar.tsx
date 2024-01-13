"use client";

import { useState } from "react";
import Link from "next/link";
import { Book, Database, Filter, Globe2, User, X } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as z from "zod";

import { Accordion } from "@/components/ui/accordion";
// import { FormField, FormItem, FormLabel, FormMessage, FormControl, Form } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
import { useDatabase } from "@/hooks/use-databases";
// import { useDatabaseModal } from "@/hooks/use-database-modal";
import { Separator } from "@/components/ui/separator";
import { IDatabase, INewDatabase } from "@/types";
import SidebarItem from "./SidebarItem";
import SidebarAccordion from "./SidebarAccordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTheme } from "@/hooks/use-theme";
import { useFilters } from "@/hooks/use-filter";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterList from "./FilterList";

interface SidebarProps {
  storageKey?: string;
}

// const colorForm = z.object({
//   primary: z.string(),
// })

const Sidebar: React.FC<SidebarProps> = ({
  storageKey = "t-sidebar-state",
}) => {
  let pathname = usePathname();
  const databaseId = pathname.startsWith("/dashboard/database")
    ? pathname.split("/")[3]
    : undefined;
  console.log("databaseId: ", databaseId);
  const { databases } = useDatabase();
  // const [ categories, setCategories ] = useState<string[]>([]);
  const { filters, remove: removeFilter } = useFilters();
  // const theme = useTheme()

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  // const form = useForm<z.infer<typeof colorForm>>({
  //   resolver: zodResolver(colorForm),
  //   defaultValues: {
  //     primary: "176 48 56",
  //   },
  // });

  return (
    <div className="h-full w-[400px] flex flex-col border-l-2 shadow-lg justify-between items-stretch">
      <div className="flex-col justify-start items-stretch">
        <div className="flex justify-center items-center mt-3">
          <Link href="/">
            <div className="flex flex-row justify-center gap-4 items-center">
              <p className="pb-1 text-3xl">نام شرکت</p>
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
          className="space-y-2 flex-1 overflow-auto flex flex-col border-4 border-green-300"
        >
          <SidebarAccordion
            value="database"
            icon={<Database />}
            title="دیتابیس ها"
          >
            {[
              {
                title: "ایجاد دیتابیس جدید",
                to: "/dashboard",
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
          {pathname.split("/")[2] === "database" && <FilterList />}
          <div />
        </Accordion>
      </div>
      {/* <div className="mb-6 border-2 border-green-700 p-4">
        <Form {...form}>
          <form 
            className="flex flex-col justify-center items-stretch gap-3"
            onSubmit={form.handleSubmit((data) => {
              theme.add(data.primary) 
            })}
          >
            <FormField
              control={form.control}
              name="primary"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col items-end">
                    <FormLabel className="shad-form_label">رنگ اصلی</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type="submit">اعمال تغییر</Button>
          </form>
        </Form>
      </div> */}
    </div>
  );
};

export default Sidebar;
