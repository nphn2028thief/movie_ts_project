import { lazy, LazyExoticComponent } from "react";
import DefaultLayout from "../layouts/default_layout";
import { IItem } from "../types/route_list";
import CPath from "./path";
import {
  FavoriteBorderOutlined,
  HomeOutlined,
  LiveTvOutlined,
  LockResetOutlined,
  LogoutOutlined,
  RateReviewOutlined,
  SearchOutlined,
  SlideshowOutlined,
} from "@mui/icons-material";

const HomePage = lazy(() => import("../pages/home_page"));
const MoviePage = lazy(() => import("../pages/movie_page"));
const TvSeriesPage = lazy(() => import("../pages/tv_series_page"));
const SearchPage = lazy(() => import("../pages/search_page"));
const FavoritePage = lazy(() => import("../pages/favorite_page"));
const ReviewPage = lazy(() => import("../pages/review_page"));
const ProfilePage = lazy(() => import("../pages/profile_page"));
const NotFoundPage = lazy(() => import("../pages/not_found_page"));

interface IRoute {
  id: number;
  name: string;
  path: string;
  page: LazyExoticComponent<() => JSX.Element>;
  layout?: (props: { children: JSX.Element }) => JSX.Element;
}

export const CRouteList: IRoute[] = [
  {
    id: 1,
    name: "Home",
    path: CPath.home,
    // icon: HomeOutlined,
    page: HomePage,
    layout: DefaultLayout,
  },
  {
    id: 2,
    name: "Movies",
    path: CPath.movie,
    // icon: SlideshowOutlined,
    page: MoviePage,
    layout: DefaultLayout,
  },
  {
    id: 3,
    name: "Tv Series",
    path: CPath.tv,
    // icon: LiveTvOutlined,
    page: TvSeriesPage,
    layout: DefaultLayout,
  },
  {
    id: 4,
    name: "Search",
    path: CPath.search,
    //   path: (mediaType: string) => CPath.search(mediaType),
    //   icon: SearchOutlined,
    page: SearchPage,
    layout: DefaultLayout,
  },
  {
    id: 5,
    name: "My Favorites",
    path: CPath.favoriteList,
    //   path: (mediaType: string) => CPath.search(mediaType),
    //   icon: SearchOutlined,
    page: FavoritePage,
    layout: DefaultLayout,
  },
  {
    id: 6,
    name: "My Reviews",
    path: CPath.reviewList,
    //   path: (mediaType: string) => CPath.search(mediaType),
    //   icon: SearchOutlined,
    page: ReviewPage,
    layout: DefaultLayout,
  },
  {
    id: 7,
    name: "My Profile",
    path: CPath.profile,
    //   path: (mediaType: string) => CPath.search(mediaType),
    //   icon: SearchOutlined,
    page: ProfilePage,
    layout: DefaultLayout,
  },
  {
    id: 8,
    name: "404 Error Not Found",
    path: CPath.notFound,
    page: NotFoundPage,
  },
];

export const CHeaderItem: IItem[] = [
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
  },
  {
    id: 3,
    name: "Tv Series",
    path: CPath.tv,
    icon: LiveTvOutlined,
  },
  {
    id: 4,
    name: "Search",
    path: CPath.search,
    icon: SearchOutlined,
  },
];

export const CUserMenu: IItem[] = [
  {
    id: 1,
    name: "My Profile",
    path: CPath.profile,
    icon: LockResetOutlined,
  },
  {
    id: 2,
    name: "Favorites",
    path: CPath.favoriteList,
    icon: FavoriteBorderOutlined,
  },
  {
    id: 3,
    name: "Reviews",
    path: CPath.reviewList,
    icon: RateReviewOutlined,
  },
];
