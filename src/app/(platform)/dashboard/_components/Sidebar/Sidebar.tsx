"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, Filter, Plus, PlusIcon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
// import "react-pro-sidebar/dist/css/styles.css";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useDatabase } from "@/hooks/use-databases";
import { useDatabaseModal } from "@/hooks/use-database-modal";
import { Separator } from "@/components/ui/separator";
import { IDatabase, INewDatabase } from "@/types";
import SidebarItem from "./SidebarItem";

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

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  return (
    <div className="h-full w-[400px] border-l-2 m-3 flex shadow-lg flex-col justify-start items-stretch">
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
        <AccordionItem value="databases">
          <AccordionTrigger className="h-14 group">
            <div className="font-medium text-xs flex items-center justify-end mb-1 w-full">
              {/* {pathname !== "/dashboard" && (
                <Button
                  onClick={() => databaseModal.onOpen()}
                  asChild
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="ml-auto"
                >
                  <div>
                    <Plus className="h-4 w-4" />
                  </div>
                </Button>
              )} */}
              <span className="pr-2 font-mono text-lg">پایگاه داده</span>
              <Database className="m-4 text-primary group-hover:animate-pulse group-[data-state=open]:text-primary" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SidebarItem
              title="اضافه کردن دیتابیس"
              to="/dashboard"
              selected={true}
              icon={<PlusIcon />}
            />
            {databases.map((database: IDatabase) => (
              <SidebarItem
                key={database.id}
                title={database.name}
                to={`/dashboard/database/${database.id}`}
                selected={database.id === databaseId}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        {pathname.split("/")[2] === "database" && (
          <AccordionItem value="filter">
            <AccordionTrigger className="h-14 group">
              <div className="font-medium text-xs flex items-center justify-end mb-1 w-full">
                <span className="pr-2 font-mono text-lg">فیلتر</span>
                <Filter className="m-4 text-primary group-hover:animate-pulse group-[data-state=open]:text-primary" />
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default Sidebar;
