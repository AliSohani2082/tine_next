import { DocumentTable, columns } from './columns'
import { DataTable } from '../_components/data-table'
import { documents } from '@/data/tableData'
import { Document } from '@/types/items'

async function getData(): Promise<DocumentTable[]> {
  // Fetch data from your API here.
  const documentsTable = documents.map((document: Document) => ({
    id: document.id,
    title: document.title,
    publisher: document.publisher.name,
    author: `${document.author.firstName} ${document.author.lastName}`,
  }))
  return documentsTable
}

export default async function DocumentPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} title="اسناد" />
    </div>
  )
}
