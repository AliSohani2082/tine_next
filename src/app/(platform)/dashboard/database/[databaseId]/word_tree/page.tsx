import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import { Expand } from "lucide-react";
import React from "react";
import RedirectLink from "./_components/redirectLink";
import HtmlComponent from "@/components/shared/HtmlComp";
import { Button } from "@/components/ui/button";
// import Loading from '@/components/shared/Loading'
// const data = require("./Document.html");

const WordTree = () => {

	return (
		<div className="w-full h-full px-7 flex justify-center items-start overflow-hidden">
			{/* <Suspense fallback={<Loading/>}> */}
				{/* <HtmlComponent htmlContent="@/docs/Document.html" /> */}
				<RedirectLink link="http://localhost:3000/Document.html">
					<Expand />
				</RedirectLink>
      {/* </Suspense> */}
		</div>
	);
};

export default WordTree;
