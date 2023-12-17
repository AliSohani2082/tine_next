"use client";

import Link from "next/link";
import { LogOut, Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Account = () => {
  return (
    <Link
      href="/dashboard"
      className="flex flex-row justify-between items-center"
    >
      <h2 className="text-lg mx-2">علی سوهانی</h2>
      <Avatar className="w-12 h-12">
        <AvatarFallback>AS</AvatarFallback>
      </Avatar>
    </Link>
    // <DropdownMenu>
    //   <DropdownMenuTrigger>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-[150px]">
    //     {items.map((item) => (
    //       <DropdownMenuItem key={item.title} className="p-2">
    //         <Link href={item.href} className="flex justify-between items-center w-full">
    //           {item.icon}
    //           <span className="text-lg">{item.title}</span>
    //         </Link>
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

export default Account;
