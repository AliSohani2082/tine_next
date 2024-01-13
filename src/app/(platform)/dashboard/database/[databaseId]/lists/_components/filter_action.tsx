"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BaseItem } from "./action-menu";
import { ActionItem } from "./action_item";
import { Filter } from "lucide-react";
import { FilterType } from "@/types/items";
import { useFilters } from "@/hooks/use-filter";
import { toast } from "sonner";
import { translate } from "@/lib/utils";

type FilterActionProps<DataT> = {
  type: FilterType;
  item: DataT;
};

export function FilterAction<DataT>({
  item,
  type,
}: FilterActionProps<DataT extends BaseItem ? DataT : never>) {
  const { filters, add: addFilter, remove: removeFilter } = useFilters();
  const filter = filters.find(
    (filter) => filter.type === type && filter.dataId === item.id
  );

  return (
    <ActionItem
      item={item}
      isActive={filter ? true : false}
      icon={<Filter />}
      label={`اضافه کردن ${translate(type)} به فیلتر ها`}
      onClick={() => {
        if (!filter) {
          const newId = uuidv4();
          addFilter({
            id: newId,
            type: type,
            dataId: item.id,
          });
          console.log("filters: ", filters);
          toast("آیتم مورد نظر با موفقیت به فیلتر ها اضافه شد", {
            action: {
              label: "برگشت",
              onClick: () => removeFilter(newId),
            },
          });
        } else {
          if (filter) {
            removeFilter(filter.id);
          }
        }
      }}
    />
  );
}
