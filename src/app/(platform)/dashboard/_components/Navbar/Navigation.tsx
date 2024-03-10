import React from "react";
import Link from "next/link";

import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { GitGraph } from "lucide-react";

type SingleNavigationItem = {
	title: string;
	href: string;
	description: string;
};
type DropdownNavigationItem = {
	title: string;
	items: SingleNavigationItem[];
};

const components: (SingleNavigationItem | DropdownNavigationItem)[] = [
	{
		title: "لیست ها",
		href: "lists",
		description: "لیست تمام آیتم های دیتابیس را مشاهده میکنید.",
	},
	{
		title: "گراف ها",
		items: [
			{
				title: "گراف همکاری",
				href: "collaboration_graph",
				description:
					"گراف همکاری برای مشاهده گروه های همکاری از آیتم های دیتابیس را مشاهده میکنید.",
			},
			{
				title: "گراف همرخدادی",
				href: "co-occurrence_graph",
				description: "گراف همرخدادی برای مشاهده گروه های هم",
			},
			{
				title: "گراف پیوندکتابشناختی",
				href: "bibliographic_graph",
				description:
					"گراف پیوندکتابشناختی برای مشاهده گراف همکاری از آیتم های دیتابیس را مشاهده می",
			},
			{
				title: "گراف هم ارجاعی",
				href: "referential_graph",
				description:
					"گراف هم ارجاعی برای مشاهده گروه های ه ارجاعی از آیتم های دیتابیس را مشاهده میکنید",
			},
			{
				title: "گراف ارجاعات",
				href: "referral_graph",
				description:
					"گراف ارجاعات برای مشاهده گروه های اارجاعات از آیتم های دیتابیس را مشاهده میکنید",
			},
		],
	},
	{
		title: "اطلاعات جامع",
		href: "",
		description:
			"اطلاعات جامع برای مشاهده اطلاعات جاممع از آیتم های دیتابیس را مشاهده میکنید",
	},
];

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"flex flex-col justify-center items-end select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="flex flex-row itemx-center justify-center gap-2 text-sm font-medium leading-none">
						{title}
						<GitGraph />
					</div>
					<p className="text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

type NavigationProps = {
	databaseId: string;
};

const Navigation: React.FC<NavigationProps> = ({ databaseId }) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{components.map((component, index) => {
					if ("items" in component) {
						return (
							<NavigationMenuItem key={index} title={component.title}>
								<NavigationMenuTrigger>{component.title}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
										{component.items.map((item, index) => (
											<ListItem
												href={`/dashboard/database/${databaseId}/${item.href}`}
												title={item.title}
												key={index}
											>
												{item.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						);
					} else {
						return (
							<NavigationMenuItem key={index}>
								<Link
									href={`/dashboard/database/${databaseId}/${component.href}`}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										{component.title}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						);
					}
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default Navigation;
