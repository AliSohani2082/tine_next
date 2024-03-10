import { IFilter } from "@/types";
import { create } from "zustand";
import { toast } from "sonner";

interface useFiltersProps {
	filters: IFilter[];
	add: (database: IFilter) => void;
	remove: (id: string) => void;
}

const filterOrder = {
	author: 1,
	document: 2,
	country: 3,
};

export const useFilters = create<useFiltersProps>((set) => ({
	filters: [],
	add: (filter: IFilter) =>
		set((state) => {
			const isFilterExist = state.filters.some(
				(f) => f.type === filter.type && f.dataId === filter.dataId,
			);

			if (!isFilterExist) {
				state.filters.push(filter);
				state.filters.sort((a, b) => filterOrder[a.type] - filterOrder[b.type]);
				toast("آیتم مورد نظر با موفقیت به فیلتر ها اضافه شد", {
					action: {
						label: "برگشت",
						onClick: () => state.remove(filter.id),
					},
				});
			}

			return { filters: state.filters };
		}),
	remove: (id) =>
		set((state) => {
			toast.success("فیلتر با موفقیت حذف شد");
			return {
				filters: state.filters.filter((filter) => filter.id !== id),
			};
		}),
}));
