"use client";

import React from "react";
import { Settings, LogOut, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { redirect, usePathname } from "next/navigation";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
}

const Menu = () => {

  const { setTheme, theme } = useTheme();

  const items: MenuItem[] = [
    {
      title: "پروفایل",
      icon: <User />,
      href: "/dashboard",
    },
    {
      title: "تم",
      icon: theme === "dark" ? <Moon/> : <Sun />,
      action: () => setTheme(theme === "dark"? "light" : "dark"),
    },
    {
      title: "تنظیمات",
      icon: <Settings />,
      href: "/dashboard",
    },
    {
      title: "خروج",
      icon: <LogOut />,
      href: "/dashboard",
    },
  ];

  return (
    <TooltipProvider>
      <ul className="flex flex-row justify-center items-center gap-x-2">
        {items.map((item) => (
          <li key={item.title}>
            <Tooltip>
              <TooltipTrigger asChild className="hover:text-primary">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    item?.action ? item?.action() : redirect(item?.href?? "")
                  }
                  className="rounded-full flex justify-center items-center"
                >
                  {item.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{item.title}</span>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
};

export default Menu;
