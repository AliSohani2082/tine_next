"use client";

import { useState, useEffect } from "react";
import { CountryTable, columns } from "./columns";
import { DataTable } from "../_components/data-table";
import { countries } from "@/data/dataAdaptor";
import Lottie from "react-lottie";
import dots from "public/assets/animation/dots.json";

async function getData(id: string): Promise<CountryTable[]> {
	const countriesTable = countries(id).map(
		(country): CountryTable => ({
			id: country.id.toString(),
			name: country.name,
			documentPublished: country.documentPublished,
		}),
	);
	return countriesTable;
}

interface CountriesProps {
	databaseId: string;
}

const Countries: React.FC<CountriesProps> = ({ databaseId }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CountryTable[]>([]);

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
				<DataTable columns={columns} data={data} title="کشور" />
			)}
		</div>
	);
}

export default Countries;