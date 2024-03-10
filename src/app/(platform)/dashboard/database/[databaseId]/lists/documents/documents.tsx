"use client";

import { useState, useEffect } from "react";
import { DocumentTable, columns } from "./columns";
import { DataTable } from "../_components/data-table";
import { documents } from "@/data/dataAdaptor";
import Loading from "@/components/shared/Loading";

async function getData(): Promise<DocumentTable[]> {
	const documentsTable = documents.map(
		(document): DocumentTable => ({
			id: document.id.toString(),
			title: document.title,
			citation: document.citation_count,
			author: document.authors[0]?.name || "undefined",
		}),
	);
	return documentsTable;
}

export default function Documents() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<DocumentTable[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getData();
			setData(fetchedData);
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="container mx-auto py-10">
			{loading ? (
				<Loading />
			) : (
				<DataTable columns={columns} data={data} title="اسناد" />
			)}
		</div>
	);
}
