import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import React from "react";

type ShowMoreDrawerProps = {
	trigger: React.ReactNode;
	children: React.ReactNode;
};

const ShowMoreDrawer: React.FC<ShowMoreDrawerProps> = ({
	children,
	trigger,
}) => {
	return (
		<Drawer>
			<DrawerTrigger>{trigger}</DrawerTrigger>
			<DrawerContent className="w-[1550px]">{children}</DrawerContent>
		</Drawer>
	);
};

export default ShowMoreDrawer;
