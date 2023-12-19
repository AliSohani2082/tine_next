import React from "react";
import TagTabs from "@/components/shared/TagTabs";
import { TabsContent } from "@/components/ui/tabs";

const lists: { title: string; to: string }[] = [
  {
    title: "نویسنده",
    to: "authors",
  },
  {
    title: "کشور",
    to: "countries",
  },
  {
    title: "سازمان",
    to: "organizations",
  },
];

const BibliographicLayout = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { databaseId: string };
}) => {
  return (
    <TabsContent value="bibliographic_graph">
      <TagTabs
        baseUrl={`/dashboard/database/${params.databaseId}/bibliographic_graph`}
        lists={lists}
      >
        {children}
      </TagTabs>
    </TabsContent>
  );
};

export default BibliographicLayout;
