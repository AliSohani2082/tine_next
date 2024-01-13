"use client";

import React from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { FilterType } from "@/types/items";
import { FilterAction } from "./filter_action";
import { MoreAction } from "./more_action";
import { ActionItem, ActionItemProp } from "./action_item";

export interface BaseItem {
  id: string;
}

interface ActionMenuProps<DataT> {
  type: FilterType;
  item: DataT;
  aditionalActions?: ActionItemProp<DataT extends BaseItem ? DataT : never>[];
}

export function ActionMenu<DataT>({
  aditionalActions,
  item,
  type,
}: ActionMenuProps<DataT extends BaseItem ? DataT : never>) {
  return (
    <TooltipProvider>
      <ul className="flex felx-row justify-center items-center gap-2">
        <MoreAction item={item} type={type} />
        <FilterAction item={item} type={type} />
        {aditionalActions?.map((action, index) => (
          <ActionItem key={index} {...action} />
        ))}
      </ul>
    </TooltipProvider>
  );
}
