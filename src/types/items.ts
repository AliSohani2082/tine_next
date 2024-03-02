export type FilterType = 'country' | 'document' | 'author'

export type Author = {
  id: string
  name: string
  organization: string
}

export type Document = {
  id: string
  doi_index: string
  title: string
  abstract: string
  publication_stage: 'Final' | 'Article in Press'
  document_type:
    | 'Article'
    | 'Book'
    | 'Book Chapter'
    | 'Conference Paper'
    | 'Data Paper'
    | 'Editorial'
    | 'Erratum'
    | 'Letter'
    | 'Note'
    | 'Retracted'
    | 'Review'
    | 'Short Survey'
  keywords: string[]
  authors: Author[]
  citation_count: number
  countries: string[]
}

export type Publisher = {
  id: string
  name: string
  country: Country
}

export type Country = {
  id: string
  name: string
  documentPublished: number
}
