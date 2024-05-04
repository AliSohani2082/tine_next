import React from "react";
import Authors from "./authors";

const AuthorPage = ({ params }: { params: { databaseId: string } }) => {
	return <Authors databaseId={params.databaseId}/>;
};

export default AuthorPage;
