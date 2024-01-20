"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, MoveLeft } from "lucide-react";

interface PaginationProps {
  active: number;
  setActive: (activePage: number) => void;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

function range(limit: number) {
  return Array.from({ length: limit }, (_, index) => index + 1);
}

const Pagination: React.FC<PaginationProps> = ({
  active,
  setActive,
  total,
  onNext,
  onPrev,
}) => {
  const [items, setItems] = React.useState<number[]>([]);
  const getItemProps = (index: number) =>
    ({
      variant: active === index - 1 ? "default" : "link",
      color: "gray",
      onClick: () => setActive(index -1),
    } as any);

  useEffect(() => {
    if (total <= 7) {
      setItems(range(total));
    } else {
      if (active <= 4) {
        setItems([1, 2, 3, 4, 5, -1, total]);
      } else if (active >= total - 3) {
        setItems([0, -1, total - 4, total - 3, total - 2, total - 1, total]);
      } else {
        setItems([0, -1, active - 1, active, active + 1, -1, total]);
      }
    }
  }, [active, total]);

  if (total === 0) return null;
  return (
    <div className="flex items-center gap-4">
      <Button
        className="flex items-center gap-2"
        onClick={onPrev}
        disabled={active + 1 === 1}
      >
        <MoveLeft strokeWidth={2} className="h-4 w-4" /> قبلی
      </Button>
      <div className="flex items-center gap-2">
        {items.map((item) =>
          item === -1 ? (
            <Button key={item} disabled>
              ...
            </Button>
          ) : (
            <Button key={item} {...getItemProps(item)}>
              {item}
            </Button>
          )
        )}
      </div>
      <Button
        className="flex items-center gap-2"
        onClick={onNext}
        disabled={active + 1 === total}
      >
        بعدی
        <MoveRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
