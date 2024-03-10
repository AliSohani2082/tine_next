"use client";

import Link from "next/link";
import React, { MouseEventHandler, ReactElement, cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useDatabase } from "@/hooks/use-databases";
import { toast } from "sonner";

export type SidebarItemProps = {
	title: string;
	icon?: React.ReactNode;
	to: string;
	selected: boolean;
	id: string | null;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
	title,
	to,
	selected,
	icon,
	id,
}) => {
	let StyledIcon = undefined;

	const [open, setOpen] = React.useState(false);
	const { remove: removeDatabase } = useDatabase();

	if (icon) {
		StyledIcon = cloneElement(icon as ReactElement, {
			className:
				(icon as ReactElement)?.props.className +
				"h-6 w-6 rounded-sm m-4 flex items-center justify-center font-bold text-2xl",
		});
	}

	return (
		<ol className="w-full">
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={() => {
					if (id) {
						removeDatabase(id);
						setOpen(false);
						toast.success("دیتابیس حذف شد");
					}
				}}
				loading={false}
			/>
			<Link
				href={to}
				className={cn(
					"w-full group flex flex-row items-center justify-between whitespace-nowrap rounded-xl hover:bg-muted transition ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 pl-2 mb-1 h-14 text-3xl active:text-sm",
					!id && "justify-end",
				)}
			>
				{id && (
					<Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
						<X size={20} />
					</Button>
				)}
				<div className="flex flex-row justify-center items-center">
					<span
						className={cn(
							"text-base",
							selected
								? "font-medium text-foreground"
								: "text-muted-foreground",
						)}
					>
						{title}
					</span>
					{icon ? (
						StyledIcon
					) : (
						<span
							className={cn(
								"h-6 w-6 rounded-sm m-2 flex items-center justify-center font-bold text-2xl",
								selected
									? "font-medium text-foreground"
									: "text-muted-foreground",
							)}
						>
							--
						</span>
					)}
				</div>
			</Link>
		</ol>
	);
};

export default SidebarItem;
