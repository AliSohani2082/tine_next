"use client";

import { Plus } from "lucide-react";

import React from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Searchbar from "../Searchbar";
import { useDatabaseModal } from "@/hooks/use-database-modal";
import Account from "./Account";
import Menu from "./Menu";
import { DatabaseSelection } from "./DatabaseSelection";
// import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  
  const pathname = usePathname()
  let databaseId = undefined
  if(pathname.startsWith("/dashboard/database/")){
    databaseId = pathname.split("/")[3] 
  }
  
  const databaseModal = useDatabaseModal();

  return (
    <nav className="px-4 shadow-lg3 flex pt-3 items-center justify-between h-16 gap-x-4 p-2 rounded-xl m-3">
      {/* <Searchbar /> */}
      {/* <Button
        variant="primary"
        size="sm"
        className="rounded-sm block md:hidden"
      >
        <Plus className="h-4 w-4" />
      </Button> */}
      <div className="flex flex-row justify-center items-center gap-4">
        <Menu/>
        {/* <DatabaseSelection databaseId={databaseId}/> */}
      </div>
      <Account />
      {/* <div className='ml-auto flex items-center gap-x-2'>
      <OrganizationSwitcher
        hidePersonal
        afterCreateOrganizationUrl="/organization/:id"
        afterLeaveOrganizationUrl="/select-org"
        afterSelectOrganizationUrl="/organization/:id"
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
        }}
      />
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox:{
              height: 30,
              width: 30,
            }
          }
        }}
      />
    </div> */}
    </nav>
  );
};

export default Navbar;
