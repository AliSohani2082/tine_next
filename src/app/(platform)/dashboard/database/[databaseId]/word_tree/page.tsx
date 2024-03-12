import { Expand } from "lucide-react";
import React from "react";
import RedirectLink from "./_components/redirectLink";
import HtmlComponent from "./_components/htmlComponent";
// import Loading from '@/components/shared/Loading'
const data = require("./Document.html");

const WordTree = () => {
	// const [htmlContent, setHtmlContent] = useState<string | null>(null);
	// const [loading, setLoading] = useState<boolean>(true);

	// useEffect(() => {
	//   fetch('./Document.html')
	//     .then(response => response.text())
	//     .then(data => {
	//       setHtmlContent(data);
	//       setLoading(false); // Set loading to false once the content is fetched
	//     })
	//     .catch(error => {
	//       console.error('Error fetching HTML:', error);
	//       setLoading(false); // Set loading to false in case of an error
	//     });
	// }, []);
	return (
		<div className="w-full h-full px-7 flex justify-center items-start overflow-hidden">
			<HtmlComponent html={data} />
			<RedirectLink link="/src/docs/Document.html">
				<Expand />
			</RedirectLink>
			{/* <Suspense fallback={<Loading/>}>
      </Suspense> */}
		</div>
	);
};

export default WordTree;
