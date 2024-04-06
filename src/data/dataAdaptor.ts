import rawCountries1 from "@/data/database1/countries.json";
import rawAuthors1 from "@/data/database1/authors.json";
import rawDocuments1 from "@/data/database1/papers.json";
import rawDocumentTypes1 from "@/data/database1/paper-type.json";
import rawYearCount1 from "@/data/database1/yearscount.json";
import rawLength1 from "@/data/database1/lengthoflists.json"

import rawCountries2 from "@/data/database2/countries.json";
import rawAuthors2 from "@/data/database2/authors.json";
import rawDocuments2 from "@/data/database2/papers.json";
import rawDocumentTypes2 from "@/data/database2/paper-type.json";
import rawYearCount2 from "@/data/database2/yearscount.json";
import rawLength2 from "@/data/database2/lengthoflists.json"

import {
	Author,
	Country,
	Document,
	DocumentType,
	PublicationStage,
} from "@/types/items";

export const countries : (id: string) => Country[] = (id: string) => (id === "1"? rawCountries1 : rawCountries2).map((country) => ({
	...country,
	id: country.id.toString(),
	documentPublished: country.documentPublished || 0,
}));

export const authors: (id: string) => Author[] = (id: string) => (id === "1"? rawAuthors1 : rawAuthors2).map((author) => ({
	...author,
	id: author.id.toString(),
}));

export const documents: (id: string) => Document[] = (id: string) => (id === "1"? rawDocuments1 : rawDocuments2).map((document) => ({
	...document,
	id: document.id.toString(),
	publication_stage: document.publication_stage as PublicationStage,
	document_type: document.document_type as DocumentType,
	authors: document.authors
		.map((author) => ({
			id: author.auid.toString(),
			name: author.name,
			organization: author.organization,
		}))
		.filter((item, index) => {
			return (
				document.authors.map((author) => author.name).indexOf(item.name) ===
				index
			);
		}), // this filter should be done in backend
}));

type DocumentTypeCount = {
	[key in DocumentType]: number;
}

type YearCount = {
	[key: string]: number;
}

type Length = {
	authors: number,
	countries: number,
	documents: number
}

export const paperTypes: (id: string) => DocumentTypeCount = (id: string) => (id === "1"? rawDocumentTypes1 : rawDocumentTypes2)

export const yearCount: (id: string) => YearCount = (id: string) => (id === "1"? rawYearCount1 : rawYearCount2)

export const length: (id: string) => Length = (id: string) => (id === "1"? rawLength1 : rawLength2)
