import React from "react";
import { CardContent, Card } from "@/components/ui/card";
import Finder from "../../dashboard/_components/DatabaseForm/Finder";

const CreatePage = () => {
	return (
		<div className="h-full w-full flex justify-center items-center px-32 py-20">
			<Card className="shadow-lg h-full w-full">
				<CardContent className="flex flex-col justify-center items-center h-full p-4">
					<Finder />
				</CardContent>
			</Card>
		</div>
	);
};

export default CreatePage;
