"use client";

import React, { useState, useEffect, cloneElement } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs_routeless";

type Page = {
  title: string;
  to: string;
  icon: React.ReactNode;
  default?: boolean
};

type TabsProps = {
  databaseId: string
  pages: Page[];
  baseUrl: string;
  children: React.ReactNode;
};

const PageTabs = ({ databaseId, pages, baseUrl, children }: TabsProps) => {
  const router = useRouter();
  let pathname = usePathname();
  const defaultPage = pages.find((pg) => pg.default) || pages[pages.length -1]
  const [activeTab, setActiveTab] = useState<Page>(defaultPage);

  const pagesName = pages.map((page) => page.to)
  type PagesName = typeof pagesName[number];
  const [afterUrl, setAfterUrl] = useState<Record<PagesName, string>>();
  useEffect(() => {
    console.log("first time rendering.")
    router.push(`${baseUrl}/${defaultPage.to}`);
  }, [])

  return (
    <Tabs
      className="w-full flex flex-col items-stretch justify-items-stretch"
      defaultValue={pages[0].to}
    >
      <TabsList className="flex justify-center items-center">
        {pages.map((page) => {
          const newIcon = cloneElement(page.icon as React.ReactElement, { className: "w-5 h-5 ml-2" })
          return (
            <TabsTrigger
              isActive={activeTab?.to === page.to}
              key={page.to}
              href={`${baseUrl}/${page.to}`}
              onClick={() => {
                setActiveTab(page);
              }}
            >
              <h1 className="font-bold text-base">{page.title}</h1>
              {newIcon}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent className="w-full">{children}</TabsContent>
    </Tabs>
  );
};

export default PageTabs;
