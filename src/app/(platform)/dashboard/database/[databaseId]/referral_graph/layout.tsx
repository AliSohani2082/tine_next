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

const ReferralGraphLayout = ({
	params,
	children,
}: {
	children: React.ReactNode;
	params: { databaseId: string };
}) => {
	return (
		<TagTabs
			baseUrl={`/dashboard/database/${params.databaseId}/referral_graph`}
			lists={lists}
		>
			{children}
		</TagTabs>
	);
};

export default ReferralGraphLayout;
