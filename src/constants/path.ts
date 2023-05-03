const CPath = {
  home: "/",
  movie: "/movie",
  tv: "/tv",
  search: "/search",
  mediaList: "/:mediaType",
  movieDetail: "/movie/:movieId",
  tvDetail: "/tv/:tvId",
  mediaDetail: "/:mediaType/:mediaId",
  personDetail: "/person/:personId",
  mediaLists: (mediaType: string) => `/${mediaType}`,
  // mediaList: (mediaType: string, mediaCategory: string) =>
  //   `/:${mediaType}/:${mediaCategory}`,
  // mediaDetail: (mediaType: string, mediaId: string) =>
  //   `/:${mediaType}/detail/:${mediaId}`,
  // person: (personId: string) => `/person/:${personId}`,
  favoriteList: "/me/favorites",
  reviewList: "/me/reviews",
  profile: "/me/profile",
  notFound: "*",
};

export default CPath;
