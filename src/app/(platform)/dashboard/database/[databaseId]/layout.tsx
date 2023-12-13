import PageTabs from "@/components/shared/pageTabs";
import { usePathname } from "next/navigation";

const pages = [
  {
    title: "اطالاعت جامع",
    to: "",
  },
  {
    title: "گراف ها",
    to: "graphs",
  },
  {
    title: "لیست ها",
    to: "lists",
  },
];

const databaseIdLayout = ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { databaseId: string };
}) => {
  return (
    <PageTabs
      pages={pages}
      baseUrl={`/dashboard/database/${params.databaseId}`}
    >
      {children}
    </PageTabs>
  );
};

export default databaseIdLayout;
