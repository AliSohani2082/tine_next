"use client";

import React from "react";
import { Settings, LogOut, User, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { redirect, usePathname } from "next/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const items = [
  {
    title: "پروفایل",
    icon: <User />,
    href: "/dashboard",
  },

  {
    title: "تنظیمات",
    icon: <Settings />,
    href: "/dashboard",
  },
  {
    title: "تم",
    icon: <Sun />,
    action: () => console.log("Switches the theme"),
  },
  {
    title: "خروج",
    icon: <LogOut />,
    href: "/dashboard",
  },
];

const Menu = () => {
  return (
    <TooltipProvider>
      <ul className="flex flex-row justify-center items-center gap-x-2">
        {items.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild className="group">
              <li>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    item?.action ? item.action() : redirect(item.href)
                  }
                  className="rounded-full flex justify-center items-center group-hover:text-primary"
                >
                  {item.icon}
                </Button>
              </li>
            </TooltipTrigger>
            <TooltipContent>
              <span>{item.title}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </ul>
    </TooltipProvider>
  );
};

export default Menu;
