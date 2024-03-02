import { redirect } from 'next/navigation'
import HtmlComponent from '@/components/shared/HtmlComp'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { Expand } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import RedirectLink from './_components/redirectLink'
const html = require('./html.ts')

type WordTreeProps = {
  params: {
    databaseId: string
  }
}

const WordTree: React.FC<WordTreeProps> = () => {
  return (
    <div className="w-full h-full px-7 flex justify-center items-start overflow-hidden">
      <p dangerouslySetInnerHTML={{ __html: html }}></p>
      {/* <HtmlComponent htmlContent="src/app/hierarchical.html" /> */}
      <RedirectLink link="../hierarchical.html">
        <Expand />
      </RedirectLink>
    </div>
  )
}

export default WordTree
