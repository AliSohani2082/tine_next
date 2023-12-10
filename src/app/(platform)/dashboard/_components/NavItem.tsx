"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { CreditCard, Database, Layout, Search, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  // isActive: boolean;
  database: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  // isActive,
  database,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "جداول",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/database/${database.id}`,
    },
    {
      label: "جست و جو",
      icon: <Search className="h-4 w-4 mr-2" />,
      href: `/database/${database.id}/search`,
    },
    {
      label: "تنظیمات",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/database/${database.id}/settings`,
    },
    // {
    //   label: "Billing",
    //   icon: <CreditCard className="h-4 w-4 mr-2" />,
    //   href: `/database/${database.id}/billing`,
    // },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={database.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(database.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline"
          // isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Database className="h-6 w-6 rounded-sm p-1 bg-sky-300" />
          </div>
          <span className="font-medium text-sm">{database.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            asChild
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1 flex flex-row justify-evenly h-14",
              pathname === route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            <div>
              {route.label}
              {route.icon}
            </div>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
