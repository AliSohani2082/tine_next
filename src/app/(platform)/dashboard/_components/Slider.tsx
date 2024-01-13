"use client";

import React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDownSlider } from "@/hooks/use-downSlider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SliderProps = {};

const Slider: React.FC<SliderProps> = (props) => {
  const { isOpen, onClose, item } = useDownSlider();

  return (
    <Card
      className={cn(
        "transition-h bg-gray-200 duration-700 ease-in-out overflow-hidden flex flex-col justify-stretch items-stretch",
        isOpen ? "h-[200px] hover:h-[300px]" : "h-0"
      )}
    >
      <CardHeader className="w-full flex justify-end items-center">
        <Button variant="ghost" onClick={onClose}>
          <X />
        </Button>
      </CardHeader>
      <CardContent>
        <span>{item?.id}</span>
      </CardContent>
    </Card>
  );
};

export default Slider;
