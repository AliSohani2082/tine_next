import React from "react";
import TagTabs from "@/components/shared/TagTabs";
import { TabsContent } from "@/components/ui/tabs";

const lists: { title: string; to: string }[] = [
  {
    title: "اسناد",
    to: "documents",
  },
  {
    title: "نویسنده",
    to: "authors",
  },
  {
    title: "سازمان",
    to: "organizations",
  },
  {
    title: "کشور",
    to: "countries",
  },
  {
    title: "مجله",
    to: "journals",
  },
];
const ReferentialGraphLayout = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { databaseId: string };
}) => {
  return (
    <TabsContent value="referential_graph">
      <TagTabs
        baseUrl={`/dashboard/database/${params.databaseId}/referential_graph`}
        lists={lists}
      >
        {children}
      </TagTabs>
    </TabsContent>
  );
};

export default ReferentialGraphLayout;
