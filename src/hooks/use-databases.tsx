import { IDatabase } from "@/types";
import { create } from "zustand";

interface useDatabasesProps {
  databases: IDatabase[];
  add: (database: IDatabase) => void;
  remove: (id: string) => void;
}

export const useDatabase = create<useDatabasesProps>((set) => ({
  databases: [
    {
      id: "1",
      name: "database1",
    },
    {
      id: "2",
      name: "database2",
    },
    {
      id: "3",
      name: "database3",
    },
  ],
  add: (database) =>
    set((state) => {
      state.databases.push(database);
      return { databases: state.databases };
    }),
  remove: (id) =>
    set((state) => ({
      databases: state.databases.filter((db) => db.id !== id),
    })),
}));
