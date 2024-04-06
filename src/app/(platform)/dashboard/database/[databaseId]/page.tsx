import Bar from "@/components/charts/Bar";
import Bar2 from "@/components/charts/Bar2";
import ChartCard from "@/components/charts/ChartCard";
import LineChart from "@/components/charts/LineChart";
import Map from "@/components/charts/Map";
import { numData, geoData } from "@/components/charts/data";
import PieChart from "@/components/charts/pieChart";
import { Card, CardContent } from "@/components/ui/card";
import { cn, farsiNumber } from "@/lib/utils";
import { Book, Globe2, User } from "lucide-react";
import { paperTypes, length, yearCount, countries } from "@/data/dataAdaptor";

const colors: { [key: string]: string } = {
	paleCoral: "#f78da7",
	softApricot: "#fbb072",
	sandyBeige: "#f5e4ca",
	paleLemon: "#f2f5b3",
	buttercream: "#f2f2e5",
	lightSkyBlue: "#d0f4f9",
	lavender: "#e6e6fa",
	paleMauve: "#d9b3e2",
	softLilac: "#c9c3d0",
	paleMintGreen: "#dcedc8",
	sageGreen: "#c2d6b4",
	lightOlive: "#dfaa8c",
	wheat: "#f2e8cf",
	cream: "#ffffdd",
	blushPink: "#f7cac9",
	honeydew: "#f0fff0",
	ivory: "#fefcff",
	lightSalmon: "#ffa07a",
	paleTurquoise: "#afeeee",
	lightPeriwinkle: "#c5d0e0",
	lavenderGray: "#d8d8d8",
	taupe: "#ccc5b9",
	lightKhaki: "#f0e68c",
	paleSand: "#e5d7bd",
	oatmeal: "#e2c9b3",
	eggshell: "#f5f3f1",
	champagne: "#f7ece6",
	lightTaupe: "#dcdcdc",
};

const OraganizationPage = ({ params }: { params: { databaseId: string } }) => {

	const pieChartData = Object.keys(paperTypes(params.databaseId)).map((key, index) => ({
		label: key,
		value: Object.values(paperTypes(params.databaseId))[index],
		color: Object.values(colors)[index],
	}));
	

	const infoCards: {
		title: string;
		icon: React.ReactNode;
		number: number;
		color: string;
	}[] = [
		{
			title: "مقالات",
			icon: <Book size={40} />,
			number: length(params.databaseId).documents || 0,
			color: "text-blue-400",
		},
		{
			title: "نویسندگان",
			icon: <User size={40} />,
			number: length(params.databaseId).authors || 0,
			color: "text-green-400",
		},
		{
			title: "کشور ها",
			icon: <Globe2 size={40} />,
			number: length(params.databaseId).countries || 0,
			color: "text-red-400",
		},
	];
	
	return (
		<div className="flex w-full h-full px-16 overflow-auto flex-col">
			<div className="w-full flex py-5 justify-around items-center">
				{infoCards.map((infoCard) => (
					<Card key={infoCard.title}>
						<CardContent className="flex p-4 px-10 flex-col justify-center items-center">
							<div className="flex flex-row gap-3 justify-between items-center">
								<span className="text-2xl">{infoCard.title}</span>
								{infoCard.icon}
							</div>
							<span className={cn("text-3xl mt-3", infoCard.color)}>
								#{infoCard.number}
							</span>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="flex flex-col m-4 gap-4">
				<div className="flex flex-row justify-stretch items-stretch gap-4">
					<ChartCard title="تعداد مقالات در طول سال ها" className="w-3/4">
						{/* <div>1</div> */}
						<LineChart
							data={Object.values(yearCount(params.databaseId))}
							labels={Object.keys(yearCount(params.databaseId))}
						/>
					</ChartCard>
					<ChartCard title="انواع مقالات" className="flex-1">
						{/* <div>2</div> */}
						<PieChart data={pieChartData} />
					</ChartCard>
				</div>
				<div className="flex flex-row gap-4">
					<ChartCard title="نقشه" className="w-full">
						{/* <div>3</div> */}
						<Map data={countries(params.databaseId)} width={400} height={180} />
					</ChartCard>
				</div>
			</div>
		</div>
	);
};

export default OraganizationPage;
