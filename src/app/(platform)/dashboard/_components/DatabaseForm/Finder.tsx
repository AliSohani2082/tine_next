"use client";

import React, {
	useState,
	forwardRef,
	ForwardedRef,
	useImperativeHandle,
} from "react";
import Lottie from "react-lottie";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Book, Globe2, User, Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
	CreateDatabase as CreateDatabaseValidation,
	Query,
} from "@/lib/validation";
import search from "public/assets/animation/search.json";
import dots from "public/assets/animation/dots.json";
import tick from "public/assets/animation/tick.json";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FilterType } from "@/types/items";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import FoundItem from "./FoundItem";
import { documents } from "@/data/dataAdaptor";
import { Document } from "@/types/items";
import { TooltipProvider } from "@/components/ui/tooltip";

type State = "starter" | "loading" | "done";

const results: Document[] = documents("1").slice(1, 4);
// const filters = {
//   authors: 30,
//   documents: 20,
//   countries: 12,
// }

const description = `بهترین روش برای جستجو و بازیابی اطلاعات از یک دیتابیس، استفاده از کوئری‌های ساخته شده با زبان SQL است. SQL که مخفف Structured Query Language به معنای "زبان پرس و جوی ساختار یافته" است، اجازه می‌دهد تا با استفاده از دستورات متعدد، اطلاعات مورد نیاز را از دیتابیس بازیابی کرده و با آن‌ها برخورد کرد. این دستورات شامل دستور SELECT برای انتخاب اطلاعات، دستور INSERT برای درج اطلاعات جدید، دستور UPDATE برای به روزرسانی اطلاعات موجود، و دستور DELETE برای حذف اطلاعات می‌شوند. برای مثال:

SELECT نام، نام‌خانوادگی، ایمیل
FROM کاربران
WHERE شهر = 'تهران'

این دستور از جدول کاربران تمام ردیف‌هایی که شهر آن‌ها برابر با "تهران" است را بازیابی می‌کند و اطلاعات نام، نام خانوادگی و ایمیل آن‌ها را نمایش می‌دهد.`;

const Finder = () => {
	const [state, setState] = useState<State>("starter");
	const [open, onOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [abstract, setAbstract] = useState("");

	function startSearching() {
		setState("loading");
		const timer = setTimeout(() => setState("done"), 4000);
		return () => {
			clearTimeout(timer);
		};
	}
	const onScan = async (values: z.infer<typeof CreateDatabaseValidation>) => {
		console.log(values);
		startSearching();
	};

	const onSubmitFinder = async () => {
		console.log("done!!");
	};

	const form = useForm<z.infer<typeof CreateDatabaseValidation>>({
		resolver: zodResolver(Query),
		defaultValues: {
			query: "",
		},
	});

	return (
		<CardContent className="flex flex-row justify-stretch items-stretch w-full h-full ">
			<div className="flex flex-col justify-start items-stretch w-[50%] h-full">
				<Card className="h-full flex flex-col overflow-auto justify-stretch items-stretch">
					{state !== "starter" ? (
						<>
							<CardHeader className="text-xl h-full py-2 flex justify-center font-bold w-full text-right">
								نتایج جستجو
								<div className="mt-2">تعداد مقالات: {results.length}</div>
							</CardHeader>
							<CardContent className="flex flex-col justify-between items-center flex-1 w-full h-full px-2">
								{state !== "loading" && (
									<TooltipProvider>
										{/* <ScrollArea className="flex-1 w-full h-full flex flex-col justify-between items-center"> */}
										{results.map((item, index) => (
											<Dialog key={index}>
												<DialogTrigger>
													<FoundItem key={index} data={item} />
												</DialogTrigger>
												<DialogContent className="max-h-[600px] max-w-[800px] overflow-auto">
													<DialogHeader className="pt-6">
														<DialogTitle>{item.title}</DialogTitle>
													</DialogHeader>
													<div className="text-justify">{item.abstract}</div>
												</DialogContent>
											</Dialog>
										))}
										{/* </ScrollArea> */}
									</TooltipProvider>
								)}
							</CardContent>
						</>
					) : (
						<div className="w-full p-5 h-full">
							<p className="flex flex-col justify-start items-end w-full text-right -indent-4">
								<Info size={25} className="opacity-50 mb-2" />
								<span>{description}</span>
							</p>
						</div>
					)}
				</Card>
			</div>
			{state === "loading" ? (
				<div className="flex flex-col px-5 justify-center items-center w-[50%]">
					<Lottie
						options={{ animationData: search, loop: true }}
						width={272}
						height={272}
					/>
					<span className="text-xl mt-2">درحال جست و جو مقالات</span>
					{/* <span className="mt-2">searching through datas....</span> */}
				</div>
			) : (
				<div className="flex flex-col justify-center items-center w-[50%]">
					<div className="flex flex-col justify-center items-end w-[80%]">
						{state === "done" && (
							<div className="w-full flex justify-center items-center">
								<Lottie
									options={{ animationData: tick, loop: false }}
									width={100}
									height={100}
								/>
							</div>
						)}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmitFinder)}
								className="flex flex-col items-stretch justify-start gap-2 w-full"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="flex flex-col items-end">
											<FormLabel>نام</FormLabel>
											<FormControl>
												<Input
													// disabled={loading}
													placeholder="Database"
													className="shad-input"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="query"
									render={({ field }) => (
										<FormItem className="flex flex-col items-end w-full">
											<FormLabel>کوئری</FormLabel>
											<FormControl>
												<Textarea
													// disabled={loading}
													placeholder="Database"
													className="shad-input"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex flex-row justify-end items-center gap-2 w-full">
									<Button
										variant="outline"
										onClick={() => onScan(form.getValues())}
									>
										اسکن
									</Button>
									<Button
										variant="default"
										type="submit"
										disabled={state !== "done"}
									>
										ایجاد
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			)}
		</CardContent>
	);
};

Finder.displayName = "Finder";

export default Finder;
