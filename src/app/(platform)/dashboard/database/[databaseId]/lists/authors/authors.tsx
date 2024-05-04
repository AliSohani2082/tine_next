"use client";

import { useState, useEffect } from "react";
import { AuthorTable, columns } from "./columns";
import { DataTable } from "../_components/data-table";
import { authors } from "@/data/dataAdaptor";
import Lottie from "react-lottie";
import dots from "public/assets/animation/dots.json";

async function getData(id: string): Promise<AuthorTable[]> {
	const authorTable = authors(id).map(
		(author): AuthorTable => ({
			id: author.id.toString(),
			name: author.name,
			organization: author.organization,
		}),
	);
	return authorTable;
}

interface AuthorsProps {
	databaseId: string;
}

const Authors: React.FC<AuthorsProps> = ({ databaseId }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AuthorTable[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getData(databaseId);
			setData(fetchedData);
			setLoading(false);
		};

		fetchData();
	}, [databaseId]);

	return (
		<div className="container mx-auto py-10">
			{loading ? (
				<div className="w-full h-full flex justify-center items-center">
					<Lottie
						options={{ animationData: dots, loop: true }}
						width={272}
						height={272}
					/>
				</div>
			) : (
				<DataTable columns={columns} data={data} title="نویسنده" />
			)}
		</div>
	);
}

export default Authors;