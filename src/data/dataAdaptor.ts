import rawCountries from '@/data/countries.json'
import rawAuthors from '@/data/authors.json'
import rawDocuments from '@/data/papers.json'
import { Author, Country, Document } from '@/types/items'

export const countries: Country[] = rawCountries.map((country) => ({
  ...country,
  id: country.id.toString(),
  documentPublished: country.documentPublished || 0,
}))

export const authors: Author[] = rawAuthors.map((author) => ({
  ...author,
  id: author.id.toString(),
}))

export const documents: Document[] = rawDocuments.map((document) => ({
  ...document,
  id: document.id.toString(),
  authors: document.authors.map((author) => ({
    id: author.auid.toString(),
    name: author.name,
    organization: author.organization,
  })),
}))
