import { DocumentTable, columns } from "./columns";
import { DataTable } from "./data-table";
import { documents } from "../fakeData";
import { Document } from "../types";
import { Button } from "@/components/ui/button";

async function getData(): Promise<DocumentTable[]> {
  // Fetch data from your API here.
  const documentsTable = documents.map((document: Document) => ({
    title: document.title,
    publisher: document.publisher.name,
    author: `${document.author.firstName} ${document.author.lastName}`,
  }));
  return documentsTable;
}

export default async function DocumentPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
