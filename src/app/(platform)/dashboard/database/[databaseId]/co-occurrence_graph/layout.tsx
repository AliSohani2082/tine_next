import React from "react";
import { TabsContent } from "@/components/ui/tabs";

const Co_ccurrenceGraphLayout = ({
  children,
}: {
  children: React.ReactNode;
  params: { databaseId: string };
}) => {
  return <div>{children}</div>;
};

export default Co_ccurrenceGraphLayout;
