"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type List = {
  title: string;
  to: string;
};

type TabsProps = {
  children: React.ReactNode;
  baseUrl: string;
  lists: List[];
};

const TagTabs = ({ children, baseUrl, lists }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<List>(lists[0]);
  const router = useRouter();
  let pathname = usePathname();

  const baseArray = baseUrl.split("/");
  const path = pathname.split("/");

  console.log(baseUrl);
  if (baseArray.length !== path.length) {
    // TODO: store the after URL
    pathname = baseUrl;
  }

  return (
    <div className="flex flex-col justify-start items-stretch w-full">
      <div className="flex flex-row justify-end items-center border-b-2">
        {lists.map((list) => (
          <Button
            key={list.to}
            onClick={() => {
              setActiveTab(list);
              router.push(`${pathname}/${list.to}`);
            }}
            variant="primary"
            className={cn(
              "rounded-full px-4 py-2 m-2",
              list.to === activeTab.to ? "bg-sky-700/90" : ""
            )}
          >
            {list.title}
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
};

export default TagTabs;
