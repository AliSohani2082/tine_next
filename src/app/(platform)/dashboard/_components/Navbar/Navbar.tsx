"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useDatabaseModal } from "@/hooks/use-database-modal";
import Account from "./Account";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Menu from "./Menu";
import Navigation from "./Navigation";
// import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

const Navbar = () => {
	const pathname = usePathname();
	let databaseId = undefined;
	if (pathname.startsWith("/dashboard/database/")) {
		databaseId = pathname.split("/")[3];
	}
	const isDatabase = databaseId !== undefined;

	const databaseModal = useDatabaseModal();

	return (
		<nav className="px-4 shadow-lg3 bg-primary shadow-lg flex pt-3 items-center justify-between h-16 gap-x-4 p-2 rounded-xl m-3">
			{/* <Button
        size="sm"
        className="rounded-sm block md:hidden"
      >
        <Plus className="h-4 w-4" />
      </Button> */}
			<div className="flex flex-row justify-center items-center gap-4">
				{/* <DatabaseSelection databaseId={databaseId}/> */}
				{/* { databaseId !== undefined && <Navigation databaseId={databaseId} />} */}
				<Account />
			</div>
			<Menu />
		</nav>
	);
};

export default Navbar;
