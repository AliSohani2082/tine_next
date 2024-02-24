import { redirect } from "next/navigation";
import HtmlComponent from "@/components/shared/HtmlComp";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Expand } from "lucide-react";
import React from "react";
import Link from "next/link";
import RedirectLink from "./_components/redirectLink";

type WordTreeProps = {
  params: {
    databaseId: string;
  };
}

const WordTree: React.FC<WordTreeProps> = () => {
  
  return (
    <div className="w-full h-full px-7 flex justify-center items-start overflow-hidden">
      <HtmlComponent dir="src/app/Document.html" />
      <RedirectLink link="/Document.html">
        <Expand/>
      </RedirectLink>

    </div>
  )
}

export default WordTree;