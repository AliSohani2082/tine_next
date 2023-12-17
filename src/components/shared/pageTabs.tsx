"use client";

import React, { useState, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDatabase } from "@/hooks/use-databases";
// import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'

type Page = {
  title: string;
  to: string;
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
    console.log("baseUrl", baseUrl)
    console.log("newAfterUrl: ", newAfterUrl)
    setAfterUrl({
      ...afterUrl,
      [activeTab?.to || pages[0].to]: newAfterUrl
    })

    console.log("called")
    if(!activeTab){
      setActiveTab(pages[0])
      router.push(`${baseUrl}/${pages[0].to}/${afterUrl[pages[0].to]}`) 
    } else {
      router.push(`${baseUrl}/${activeTab.to}/${afterUrl[activeTab.to]}`);
    }

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
      <TabsList className="flex flex-wrap -mb-px">
        {pages.map((page) => (
          <TabsTrigger
            key={page.to}
            value={page.to}
            onClick={() => {
              setActiveTab(page);
              router.push(`${pathname}/${page.to}`);
            }}
          >
            <h1 className="font-bold text-2xl">{page.title}</h1>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="w-full">{children}</div>
    </Tabs>
  );
};

export default PageTabs;
