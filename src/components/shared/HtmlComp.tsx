// "use client"

// import { useState, useEffect } from "react";
const html = require("@/docs/Document.html")
interface HtmlComponentProps {
	htmlContent: string;
}

const HtmlComponent: React.FC<HtmlComponentProps> = ({ htmlContent }) => {
	// const [htmlFileString, setHtmlFileString] = useState<string>("");

  // async function fetchHtml() {
  //   setHtmlFileString(await (await fetch(htmlContent)).text());
	// 	console.log(htmlContent)
  // }
  // useEffect(() => {
  //   fetchHtml();
  // }, []);

	return (
		<div className="w-full h-full relative">
			<div dangerouslySetInnerHTML={{ __html: html }}></div>
			{/* <div dangerouslySetInnerHTML={{ __html: htmlFileString || "" }}></div> */}
		</div>
	);
};

export default HtmlComponent;
