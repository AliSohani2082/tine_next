"use client";

type htmlCompProps = {
	html: any;
};

const htmlComp: React.FC<htmlCompProps> = ({ html }) => {
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default htmlComp;
