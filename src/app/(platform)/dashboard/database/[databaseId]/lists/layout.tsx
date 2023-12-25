import React from "react";
import TagTabs from "@/components/shared/TagTabs";
import { TabsContent } from "@/components/ui/tabs";

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
    <div className="overflow-auto">

      <TagTabs
        baseUrl={`/dashboard/database/${params.databaseId}/lists`}
        lists={lists}
      >
        <div className="overflow-auto">
          {children}
        </div>
      </TagTabs>
    </div>
  );
};

export default ListsPage;
