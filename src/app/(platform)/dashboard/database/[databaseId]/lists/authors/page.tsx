import { AuthorTable, columns } from "./columns";
import { DataTable } from "../_components/data-table";
import { authors } from "../fakeData";
import { Author } from "../types";

async function getData(): Promise<AuthorTable[]> {
  // Fetch data from your API here.
  const authorTable = authors.map((author: Author) => ({
    name: `${author.firstName} ${author.lastName}`,
  }));
  return authorTable;
}

export default async function DocumentPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} searchItem="name" />
    </div>
  );
}
