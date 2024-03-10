import PageTabs from "@/components/shared/pageTabs";
import { useDatabase } from "@/hooks/use-databases";
import { Book, ClipboardList, Waypoints } from "lucide-react";
import { usePathname } from "next/navigation";

const pages = [
	{
		title: "لیست ها",
		to: "lists",
		icon: <ClipboardList />,
	},
	{
		title: "گراف همکاری",
		to: "collaboration_graph",
		icon: <Waypoints />,
	},
	{
		title: "گراف همرخدادی",
		to: "co-occurrence_graph",
		icon: <Waypoints />,
	},
	{
		title: "گراف پیوندکتابشناختی",
		to: "bibliographic_graph",
		icon: <Waypoints />,
	},
	{
		title: "گراف هم ارجاعی",
		to: "referential_graph",
		icon: <Waypoints />,
	},
	{
		title: "گراف ارجاعات",
		to: "referral_graph",
		icon: <Waypoints />,
	},
	{
		title: "گراف مقالات",
		to: "word_tree",
		icon: <Waypoints />,
	},
	{
		title: "گراف سلسله مراتب",
		to: "hierarchical",
		icon: <Waypoints />,
	},
	{
		title: "اطلاعات جامع",
		to: "",
		icon: <Book />,
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
		<div className="relative w-full h-full">
			<PageTabs
				databaseId={params.databaseId}
				pages={pages}
				baseUrl={`/dashboard/database/${params.databaseId}`}
			>
				<div className="w-full h-full">{children}</div>
			</PageTabs>
		</div>
	);
};

export default databaseIdLayout;
