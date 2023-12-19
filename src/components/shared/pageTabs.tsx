"use client";

import React, { useState, useEffect, cloneElement } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDatabase } from "@/hooks/use-databases";
// import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'

type Page = {
  title: string;
  to: string;
  icon: React.ReactNode;
};

type TabsProps = {
  databaseId: string
  pages: Page[];
  baseUrl: string;
  children: React.ReactNode;
};

const PageTabs = ({ databaseId, pages, baseUrl, children }: TabsProps) => {
  
  const { databases } = useDatabase()
  const router = useRouter();
  let pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Page | undefined>();
  
  const pagesName = pages.map((page) => page.to)
  type PagesName = typeof pagesName[number];
  const [afterUrl, setAfterUrl] = useState<Record<PagesName, string>>({});

  useEffect(() => {

    const newAfterUrl = pathname.slice(baseUrl.length)
    console.log("pathname", pathname)
    console.log("newAfterUrl: ", newAfterUrl)
    console.log("baseUrl", baseUrl)
    console.log("called")
    if(!activeTab){
      setAfterUrl({
        ...afterUrl,
        [pages[0].to]: newAfterUrl
      })
      setActiveTab(pages[0])
      router.push(`${baseUrl}/${pages[0].to}`) 
    } else {
      setAfterUrl({
        ...afterUrl,
        [activeTab.to]: newAfterUrl
      })  
      router.push(`${baseUrl}/${activeTab.to}`);
    }
    console.log("afterUrl", afterUrl)

  }, [activeTab, pathname, router]);

  if(!databases.some((db) => db.id === databaseId)){
    return <div>Database not found</div>
  }

  const baseUrlArray = baseUrl.split("/");
  const path = pathname.split("/");

  if (baseUrlArray.length !== path.length) {
    // TODO: store the after URL
    pathname = baseUrl;
  }


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
              key={page.to}
              value={page.to}
              onClick={() => {
                setActiveTab(page);
                router.push(`${pathname}/${page.to}`);
              }}
            >
              <h1 className="font-bold text-base">{page.title}</h1>
              {newIcon}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <div className="w-full">{children}</div>
    </Tabs>
  );
};

export default PageTabs;
