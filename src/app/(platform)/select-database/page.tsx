import React from "react";
import { useRouter } from "next/navigation";

import {
	Card,
	CardDescription,
	CardTitle,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { useDatabase } from "@/hooks/use-databases";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import DatabaseList from "./_components/databaseList";

type Props = {};

const SelectDatabasePage = (props: Props) => {
	return (
		<>
			<CardHeader>
				<CardTitle className="font-bold text-xl flex flex-row justify-end">
					یک پایگاه داده انتخاب کنید
				</CardTitle>
				<CardDescription className="flex flex-row justify-end">
					میتوانید یک پایگاه داده انتخاب یا ایجاد کنید
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-start items-stretch">
				<DatabaseList />
			</CardContent>
		</>
	);
};

export default SelectDatabasePage;
