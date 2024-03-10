import { Expand } from "lucide-react";
import React from "react";
const hierarchical = require("./hierarchical.html");
import RedirectLink from "./_components/redirectLink";
import HtmlComponent from "./_components/htmlComponent";

const Hierarchical = () => {
	return (
		<div className="w-full h-full px-7 flex justify-center items-start overflow-hidden">
			<HtmlComponent html={hierarchical} />
			<RedirectLink link="/src/docs/hierarchical.html">
				<Expand />
			</RedirectLink>
		</div>
	);
};

export default Hierarchical;
