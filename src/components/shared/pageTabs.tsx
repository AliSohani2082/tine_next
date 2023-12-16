"use client";

import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Tabs, TabPanel, TabList, Tab } from 'react-tabs'

type Page = {
  title: string;
  to: string;
};

type TabsProps = {
  pages: Page[];
  baseUrl: string;
  children: React.ReactNode;
};

const PageTabs = ({ pages, baseUrl, children }: TabsProps) => {
  const router = useRouter();
  const [value, setValue] = useState<string>();
  let pathname = usePathname();

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
              setValue(page.to);
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
