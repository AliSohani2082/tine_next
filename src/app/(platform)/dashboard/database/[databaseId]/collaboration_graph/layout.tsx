import React from "react";
import TagTabs from "@/components/shared/TagTabs";

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

const CollaborationGraphLayout = ({
	params,
	children,
}: {
	children: React.ReactNode;
	params: { databaseId: string };
}) => {
	return (
		<TagTabs
			baseUrl={`/dashboard/database/${params.databaseId}/collaboration_graph`}
			lists={lists}
		>
			{children}
		</TagTabs>
	);
};

export default CollaborationGraphLayout;
