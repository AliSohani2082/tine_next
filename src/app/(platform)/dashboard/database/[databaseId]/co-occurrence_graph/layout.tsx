import React from "react";
import { TabsContent } from "@/components/ui/tabs";

const Co_ccurrenceGraphLayout = ({
  children,
}: {
  children: React.ReactNode;
  params: { databaseId: string };
}) => {
  return (
    <TabsContent value="co-occurrence_graph">
      {children}
    </TabsContent>
  );
};

export default Co_ccurrenceGraphLayout;
