"use client";

import React, { useEffect, useState } from "react";

import { ActionItem } from "./action_item";
import { Eye } from "lucide-react";
import { BaseItem } from "./action-menu";
import ShowMoreDrawer from "./showMoreDrawer";
import { translate } from "@/lib/utils";
import { FilterType } from "@/types/items";
import { useDownSlider } from "@/hooks/use-downSlider";

type MoreActionProps<DataT> = {
  type: FilterType;
  item: DataT;
};

const Content = () => {
  return (
    <span className="h-[250px] flex justify-center items-center">Content</span>
  );
};

export function MoreAction<DataT>({
  item,
  type,
}: MoreActionProps<DataT extends BaseItem ? DataT : never>) {
  const { onOpen, onClose, isOpen, item: sliderItem } = useDownSlider();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      isOpen && item.id === sliderItem?.id && type === sliderItem?.type
    );
  }, [isOpen, item, sliderItem, type]);

  return (
    <ActionItem
      item={item}
      isActive={isActive}
      icon={<Eye />}
      label={`اضافه کردن ${translate(type)} به فیلتر ها`}
      onClick={() => {
        if (isActive) {
          setIsActive(false);
          onClose();
        } else {
          setIsActive(true);
          onOpen({
            id: item.id,
            type: type,
          });
        }
      }}
    />
  );
}
