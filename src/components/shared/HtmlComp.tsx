import React from "react";
import fs from "fs";

interface HtmlComponentProps {
	htmlContent: string;
}

export async function getServerSideProps({
	params,
}: {
	params: { htmlFile: string };
}) {
	const { htmlFile } = params;

	// Validate the file name (optional)
	if (!htmlFile || !htmlFile.endsWith(".html")) {
		return { notFound: true }; // Handle invalid file requests
	}

	const htmlContent = fs.readFileSync(`./src/app/Document.html`, "utf-8");

	return { props: { htmlContent } };
}

const HtmlComponent: React.FC<HtmlComponentProps> = ({ htmlContent }) => {
	return (
		<div className="w-full h-full relative">
			<iframe srcDoc={htmlContent} className="w-full h-full fixed left-20" />
		</div>
	);
};

export default HtmlComponent;
