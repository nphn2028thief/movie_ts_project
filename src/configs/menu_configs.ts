import {
  FavoriteBorderOutlined,
  HomeOutlined,
  LiveTvOutlined,
  LockResetOutlined,
  RateReviewOutlined,
  SearchOutlined,
  SlideshowOutlined,
} from "@mui/icons-material";
import CPath from "../constants/path";
import React from "react";
import { IMenuConfig } from "../types/route_list";

const HomePage = React.lazy(() => import("../pages/home_page"));
const MediaPage = React.lazy(() => import("../pages/media_page"));
const DetailPage = React.lazy(() => import("../pages/detail_page"));
const SearchPage = React.lazy(() => import("../pages/search_page"));
const FavoritePage = React.lazy(() => import("../pages/favorite_page"));
const ReviewPage = React.lazy(() => import("../pages/review_page"));
const ProfilePage = React.lazy(() => import("../pages/profile_page"));
const NotFoundPage = React.lazy(() => import("../pages/not_found_page"));
const TestPage = React.lazy(() => import("../pages/test_page"));

const menuConfigs: IMenuConfig = {
  main: [
    {
      id: 1,
      name: "Home",
      path: CPath.home,
      icon: HomeOutlined,
    },
    {
      id: 2,
      name: "Movies",
      path: CPath.movie,
      icon: SlideshowOutlined,
      state: "movie",
    },
    {
      id: 3,
      name: "Tv Series",
      path: CPath.tv,
      icon: LiveTvOutlined,
      state: "tv",
    },
    {
      id: 4,
      name: "Search",
      path: CPath.search,
      icon: SearchOutlined,
      state: "search",
    },
  ],
  users: [
    {
      id: 1,
      name: "My Profile",
      path: CPath.profile,
      icon: LockResetOutlined,
      state: "profile",
    },
    {
      id: 2,
      name: "Favorites",
      path: CPath.favoriteList,
      icon: FavoriteBorderOutlined,
      state: "favorite",
    },
    {
      id: 3,
      name: "Reviews",
      path: CPath.reviewList,
      icon: RateReviewOutlined,
      state: "review",
    },
  ],
  routes: [
    {
      id: 1,
      name: "Home",
      path: CPath.home,
      page: HomePage,
    },
    {
      id: 2,
      name: "Media",
      path: CPath.mediaList,
      page: MediaPage,
    },
    // {
    //   id: 3,
    //   name: "Tv Series",
    //   path: CPath.tv,
    //   page: MediaPage,
    //   state: "tv",
    // },
    {
      id: 4,
      name: "Search",
      path: CPath.search,
      page: SearchPage,
      state: "search",
    },
    {
      id: 5,
      name: "Media Detail",
      path: CPath.mediaDetail,
      page: DetailPage,
      state: "",
    },
    // {
    //   id: 6,
    //   name: "Media Detail",
    //   path: CPath.tvDetail,
    //   page: DetailPage,
    //   state: "tv",
    // },
    {
      id: 7,
      name: "Person Detail",
      path: CPath.personDetail,
      page: DetailPage,
      state: "person.detail",
    },
    {
      id: 8,
      name: "My Profile",
      path: CPath.profile,
      page: ProfilePage,
      state: "profile",
    },
    {
      id: 9,
      name: "Favorites",
      path: CPath.favoriteList,
      page: FavoritePage,
      state: "favorite",
    },
    {
      id: 10,
      name: "Reviews",
      path: CPath.reviewList,
      page: ReviewPage,
      state: "review",
    },
    {
      id: 11,
      name: "Not found",
      path: CPath.notFound,
      page: NotFoundPage,
      state: "",
    },
    {
      id: 12,
      name: "Test",
      path: "/test",
      page: TestPage,
      state: "",
    },
  ],
};

export default menuConfigs;
