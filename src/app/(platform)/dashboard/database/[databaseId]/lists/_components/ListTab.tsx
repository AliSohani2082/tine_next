"use client";

import TagTabs from "@/components/shared/TagTabs";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type ListTabProps = {
  children: ReactNode;
  lists: {
    title: string;
    to: string;
  }[];
};

const ListTab: React.FC<ListTabProps> = ({ children, lists }) => {
  const pathname = usePathname();
  return (
    <>
      <TagTabs baseUrl={pathname} lists={lists}>
        {children}
      </TagTabs>
    </>
  );
};

export default ListTab;
