interface ISearchHeader {
  id: number;
  type: string;
}

const searchCategories: ISearchHeader[] = [
  {
    id: 1,
    type: "movie",
  },
  {
    id: 2,
    type: "tv",
  },
  {
    id: 3,
    type: "person",
  },
];

export default searchCategories;
