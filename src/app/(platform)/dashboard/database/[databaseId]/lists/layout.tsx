import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import React from "react";
import ListsTabs from "./_components/ListTab";
import ListTab from "./_components/ListTab";
import TagTabs from "@/components/shared/TagTabs";

const lists: { title: string; to: string }[] = [
  {
    title: "اسناد",
    to: "documents",
  },
  {
    title: "نویسنده ها",
    to: "authors",
  },
  {
    title: "کشور ها",
    to: "countries",
  },
];

const ListsPage = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { databaseId: string };
}) => {
  return (
    <TabsContent value="lists">
      <TagTabs
        baseUrl={`/dashboard/database/${params.databaseId}/lists`}
        lists={lists}
      >
        {children}
      </TagTabs>
    </TabsContent>
  );
};

export default ListsPage;
