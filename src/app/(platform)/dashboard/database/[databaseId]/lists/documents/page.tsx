import React from "react";
import Documents from "./documents";

const documentsPage = ({ params }: { params: { databaseId: string } }) => {
	return <Documents databaseId={params.databaseId}/>;
};

export default documentsPage;
