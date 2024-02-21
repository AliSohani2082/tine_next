import { CountryTable, columns } from './columns'
import { DataTable } from '../_components/data-table'
import { countries } from '@/data/tableData'
import { Country } from '@/types/items'

async function getData(): Promise<CountryTable[]> {
  // Fetch data from your API here.
  const countriesTable = countries.map((country: Country) => ({
    id: country.id,
    name: country.name,
    documentPublished: country.documentPublished,
  }))
  return countriesTable
}

export default async function DocumentPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} title="کشور" />
    </div>
  )
}
