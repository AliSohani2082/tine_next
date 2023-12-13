"use client";

import { Plus } from "lucide-react";

import React from "react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Searchbar from "./Searchbar";
import { useDatabaseModal } from "@/hooks/use-database-modal";
// import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const databaseModal = useDatabaseModal();

  return (
    <nav className="px-4 h-14 border-4 shadow-lg3 flex items-center gap-x-4 p-2 rounded-xl m-3">
      <Searchbar />
      {/* <Button
        onClick={() => databaseModal.onOpen()}
        variant="primary"
        size="sm"
        className="rounded-sm hidden md:block h-auto py-1.5 px-2"
      >
        ایجاد پایگاه داده
      </Button> */}
      <Button
        variant="primary"
        size="sm"
        className="rounded-sm block md:hidden"
      >
        <Plus className="h-4 w-4" />
      </Button>
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
