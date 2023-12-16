import Link from "next/link";
import React, { ReactElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import { styled } from "@mui/material";

type SidebarItemProps = {
  title: string;
  icon?: React.ReactNode;
  to: string;
  selected: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  to,
  selected,
  icon,
}) => {
  let StyledIcon = undefined;

  if (icon) {
    StyledIcon = cloneElement(icon as ReactElement, {
      className:
        (icon as ReactElement)?.props.className +
        cn(
          "h-6 w-6 rounded-sm m-4 flex items-center justify-center font-bold text-2xl",
          selected
            ? "font-medium group-hover:text-primary"
            : "text-muted-foreground group-hover:text-primary"
        ),
    });
  }

  return (
    <ol>
      <Link
        href={to}
        className={cn(
          "group inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
          "w-full font-normal pl-10 mb-1 flex flex-row justify-end h-14 text-md active:text-sm"
        )}
      >
        <span
          className={cn(
            "text-sm",
            selected
              ? "font-medium text-foreground group-hover:text-muted-foreground"
              : "text-muted-foreground"
          )}
        >
          {title}
        </span>
        {icon ? (
          StyledIcon
        ) : (
          <span
            className={cn(
              "h-6 w-6 rounded-sm p-1 m-4 flex items-center justify-center font-bold text-2xl",
              selected
                ? "font-medium text-foreground group-hover:text-primary"
                : "text-muted-foreground group-hover:text-primary"
            )}
          >
            --
          </span>
        )}
      </Link>
    </ol>
  );
};

export default SidebarItem;
