"use client";

import React, { useEffect, useState } from "react";

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
  const [activeTab, setActiveTab] = useState<List | undefined>();
  const router = useRouter();
  let pathname = usePathname();

  useEffect(() => {
    if(!activeTab){
      setActiveTab(lists[0])
      router.push(`${pathname}/${lists[0].to}`) 
    } else {
      router.push(`${pathname}/${activeTab.to}`);
    }
  }, [activeTab, pathname, router]);

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
            onClick={() => setActiveTab(list)}
            className={cn(
              "rounded-full px-4 py-2 m-2",
              list.to === activeTab?.to
                ? "bg-primary"
                : "bg-muted-foreground text-white"
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
