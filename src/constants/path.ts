const CPath = {
  home: "/",
  movie: "/movie",
  tv: "/tv",
  // mediaList: (mediaType: string, mediaCategory: string) =>
  //   `/:${mediaType}/:${mediaCategory}`,
  // mediaDetail: (mediaType: string, mediaId: string) =>
  //   `/:${mediaType}/detail/:${mediaId}`,
  mediaList: "/:mediaType/:mediaCategory",
  mediaDetail: "/:mediaType/:mediaId",
  search: "/search",
  // person: (personId: string) => `/person/:${personId}`,
  person: "/person/:personId",
  favoriteList: "/me/favorites",
  reviewList: "/me/reviews",
  profile: "/me/profile",
  notFound: "*",
};

export default CPath;
