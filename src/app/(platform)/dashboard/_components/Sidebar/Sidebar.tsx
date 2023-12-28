"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, Filter, Plus, PlusIcon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as z from 'zod'
import { Sketch } from '@uiw/react-color'

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormField, FormItem, FormLabel, FormMessage, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDatabase } from "@/hooks/use-databases";
import { useDatabaseModal } from "@/hooks/use-database-modal";
import { Separator } from "@/components/ui/separator";
import { IDatabase, INewDatabase } from "@/types";
import SidebarItem from "./SidebarItem";
import SidebarAccordion from "./SidebarAccordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/hooks/use-theme";
import { ColorPick, RGBColor } from "@/components/ui/colorPick";

interface SidebarProps {
  storageKey?: string;
}

interface SidebarItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: any) => any;
}

const Item: React.FC<SidebarItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)}>
      {title}
      <Link href={to} />
    </MenuItem>
  );
};

const colorForm = z.object({
  primary: z.string(),
})

const Sidebar: React.FC<SidebarProps> = ({
  storageKey = "t-sidebar-state",
}) => {
  let pathname = usePathname();
  const databaseId = pathname.startsWith("/dashboard/database")
    ? pathname.split("/")[3]
    : undefined;
  console.log("databaseId: ", databaseId);
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState();
  const databaseModal = useDatabaseModal();
  const { databases } = useDatabase();
  const theme = useTheme()
  const [primaryColor, setPrimaryColor] = useState<RGBColor>({red: 100, green: 123, blue: 175})

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

  const form = useForm<z.infer<typeof colorForm>>({
    resolver: zodResolver(colorForm),
    defaultValues: {
      primary: "222 32 54",
    },
  });

  return (
    <div className="h-full w-[400px] border-l-2 m-3 shadow-lg flex flex-col justify-between items-stretch">
      <div className="flex-col justify-start items-stretch">
        <div className="flex justify-center items-center">
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
          className="space-y-2"
        >
          <SidebarAccordion
            value="database"
            icon={<Database />}
            title="دیتابیس ها"
            items={[
              {
                title: "ایجاد دیتابیس جدید",
                to: "/dashboard",
                selected: true,
              },
              ...databases?.map((database: IDatabase) => ({
                title: database.name,
                to: `/dashboard/database/${database.id}`,
                selected: databaseId === database.id,
              })),
            ]}
          />
          {pathname.split("/")[2] === "database" && (
            <SidebarAccordion
              value="filter"
              icon={<Filter />}
              title="فیلتر ها"
              items={[]}
            />
          )}
        </Accordion>
      </div>
      <div className="mb-6 border-2 border-green-700 p-4">
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
                      {/* <ColorPick {...field} color={primaryColor}, setColor={setPrimaryColor} /> */}
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
      </div>
    </div>
  );
};

export default Sidebar;
