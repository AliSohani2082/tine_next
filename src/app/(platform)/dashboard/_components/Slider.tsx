"use client";

import React from "react";
import { Minus, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDownSlider } from "@/hooks/use-downSlider";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filter";
import { v4 as uuidv4 } from "uuid";

type SliderProps = {};

const Slider: React.FC<SliderProps> = (props) => {
  const { isOpen, onClose, item } = useDownSlider();
  const { filters, add: addFilter, remove: removeFilter } = useFilters()

  if(!item) {
    return null;
  }
  const filterId = uuidv4()
  const isFilter = filters.some(filter => filter.dataId === item.id && filter.type === item.type)
  return (
    <Card
      className={cn(
        "transition-h duration-700 ease-in-out overflow-hidden flex flex-col justify-stretch items-stretch",
        isOpen ? "h-[200px] hover:h-[300px]" : "h-0"
      )}
    >
      <CardHeader className="w-full flex flex-row justify-end h-4 items-center">
        <Button variant="ghost" onClick={onClose}>
          <X />
        </Button>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-between items-center">
        <span className="text-2xl">{item?.type}:{item?.id}</span>
        <CardFooter className="flex flex-row justify-end items-center w-full">
          <div className="flex flex-row justify-center items-center gap-2">
            <Button
              variant={isFilter ? "default" : "outline"}
              onClick={() => {
                if(isFilter) {
                  removeFilter(filters.find(filter => filter.dataId === item.id && filter.type === item.type)?.id || "")
                } else {
                  addFilter({dataId: item.id, type: item.type, id: uuidv4()})}
                }
              }  
              className="flex flex-row justify-between items-center"
            >
              <span>فیلتر</span>
              {isFilter? <Minus/> : <Plus/>}
            </Button>
            <Button>مشاهده بیشتر</Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Slider;
 