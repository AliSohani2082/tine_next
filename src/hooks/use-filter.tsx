import { IFilter } from "@/types";
import { create } from "zustand";

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
  add: (filter) =>
    set((state) => {
      const isFilterExist = state.filters.some(
        (f) => f.type === filter.type && f.dataId === filter.dataId
      );

      if (!isFilterExist) {
        state.filters.push(filter);
        state.filters.sort((a, b) => filterOrder[a.type] - filterOrder[b.type]);
      }

      return { filters: state.filters };
    }),
  remove: (id) =>
    set((state) => ({
      filters: state.filters.filter((filter) => filter.id !== id),
    })),
}));
