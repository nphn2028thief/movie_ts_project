interface ISearchHeader {
  id: number;
  category: string;
}

const searchCategories: ISearchHeader[] = [
  {
    id: 1,
    category: "movie",
  },
  {
    id: 2,
    category: "tv",
  },
  {
    id: 3,
    category: "person",
  },
];

export default searchCategories;
