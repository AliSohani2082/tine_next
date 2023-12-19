"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type List = {
  title: string;
  to: string;
  default?: boolean;
};

type TabsProps = {
  children: React.ReactNode;
  baseUrl: string;
  lists: List[];
};

const TagTabs = ({ children, baseUrl, lists }: TabsProps) => {
  const defaultTab = lists.find((list) => list.default) || lists[lists.length -1]
  const [activeTab, setActiveTab] = useState<List | undefined>(defaultTab);
  const router = useRouter();
  let pathname = usePathname();

  useEffect(() => {
    router.push(`${baseUrl}/${defaultTab.to}`);
  }, [])

  // useEffect(() => {
  //   if(!activeTab){
  //     setActiveTab(lists[0])
  //     // router.push(`${pathname}/${lists[0].to}`) 
  //   } else {
  //     // router.push(`${pathname}/${activeTab.to}`);
  //   }
  // }, [activeTab, pathname, router]);

  // const baseArray = baseUrl.split("/");
  // const path = pathname.split("/");

  // console.log(baseUrl);
  // if (baseArray.length !== path.length) {
  //   // TODO: store the after URL
  //   pathname = baseUrl;
  // }

  return (
    <div className="flex flex-col justify-start items-stretch w-full">
      <div className="flex flex-row justify-end items-center border-b-2">
        {lists.map((list) => (
          <Link
            href={`${baseUrl}/${list.to}`}
            key={list.to}
            onClick={() => setActiveTab(list)}
            className={cn(
              "rounded-full px-4 py-2 m-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:opacity-80",
              list.to === activeTab?.to
                ? "bg-primary"
                : "bg-muted-foreground text-white"
            )}
          >
            {list.title}
          </Link>
        ))}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default TagTabs;
