import { Expand } from 'lucide-react'
import React from 'react'
import RedirectLink from './_components/redirectLink'
// import HtmlComponent from './_components/htmlComponent'
// var html = require('./Document.html');
// var template = { __html: __html };

// type WordTreeProps = {
//   params: {
//     databaseId: string
//   }
// }

const WordTree = () => {
  return (
    <div className="w-full h-full px-7 flex justify-center items-start overflow-hidden">
      {/* <div>
        {html}
      </div> */}
      {/* <span dangerouslySetInnerHTML={template} /> */}
      {/* <HtmlComponent htmlContent="/src/app/Document.html" /> */}
      <RedirectLink link="/src/app/Document.html">
        <Expand />
      </RedirectLink>
    </div>
  )
}

export default WordTree
