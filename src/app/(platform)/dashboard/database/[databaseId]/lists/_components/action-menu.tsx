"use client";

import React, { ReactElement, cloneElement } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ActionMenuProps<DataT> {
  item: DataT;
  actions: {
    label: string;
    icon: React.ReactNode
    onClick: (item: DataT) => void;
  }[];
}

export function ActionMenu<DataT>({ actions, item }: ActionMenuProps<DataT>) {
  return (
    <TooltipProvider>
      <ul className="flex felx-row justify-center items-center gap-2">
        {actions.map((action) => {
          const newIcon = cloneElement(action.icon as ReactElement, {
            className: "h-5 w-5 group-hover:text-primary",
          });
          return (
            <li key={action.label}>
              <Tooltip>
                <TooltipTrigger asChild className="group">
                  <Button
                    onClick={() => action.onClick(item)}
                    variant="outline"
                    className="h-10 w-10 p-2"
                  >
                    {newIcon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{action.label}</span>
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
};