"use client";

import { useState } from "react";
import Link from "next/link";
import { Database, Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
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
    <div className="h-full w-[400px] bg-slate-700 text-white m-3 rounded-xl p-2 flex flex-col justify-start items-stretch">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/public/assets/images/profile.png" alt="@Avatar" />
          <AvatarFallback className="text-gray-800">AS</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-2xl">علی سوهانی</h1>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        <AccordionItem value="databases">
          <AccordionTrigger>
            <div className="font-medium text-xs flex items-center justify-between mb-1 w-full">
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
              <span className="pr-4 font-mono text-lg">پایگاه داده</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {databases.map((database: IDatabase) => (
              <Button
                key={database.id}
                className="w-full font-normal pl-10 mb-1 flex flex-row justify-evenly h-14"
                variant="ghost"
              >
                <span className="font-medium text-sm">{database.name}</span>
                <div className="w-7 h-7 relative">
                  <Database className="h-6 w-6 rounded-sm p-1" />
                </div>
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
