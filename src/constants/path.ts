const CPath = {
  home: "/",
  movie: "/movies",
  tv: "/tv",
  // mediaList: (mediaType: string, mediaCategory: string) =>
  //   `/:${mediaType}/:${mediaCategory}`,
  // mediaDetail: (mediaType: string, mediaId: string) =>
  //   `/:${mediaType}/detail/:${mediaId}`,
  mediaList: "/:mediaType/:mediaCategory",
  mediaDetail: "/:mediaType/detail/:mediaId",
  search: "/search",
  // person: (personId: string) => `/person/:${personId}`,
  person: "/person/:personId",
  favoriteList: "/favorites",
  reviewList: "/reviews",
  profile: "/my-profile",
  notFound: "*",
};

export default CPath;
