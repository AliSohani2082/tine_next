export type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Document = {
  id: string;
  title: string;
  publisher: Publisher;
  author: Author;
};

export type Publisher = {
  id: string;
  name: string;
  country: Country;
};

export type Country = {
  id: string;
  name: string;
};
