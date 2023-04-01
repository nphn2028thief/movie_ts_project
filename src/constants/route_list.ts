import {
  FavoriteBorderOutlined,
  HomeOutlined,
  LiveTvOutlined,
  LockResetOutlined,
  RateReviewOutlined,
  SearchOutlined,
  SlideshowOutlined,
} from "@mui/icons-material";
import { lazy, LazyExoticComponent } from "react";
import CPath from "./path";

const HomePage = lazy(() => import("../pages/home_page"));
const MoviePage = lazy(() => import("../pages/movie_page"));
const TvSeriesPage = lazy(() => import("../pages/tv_series_page"));
const SearchPage = lazy(() => import("../pages/search_page"));
const FavoritePage = lazy(() => import("../pages/favorite_page"));
const NotFoundPage = lazy(() => import("../pages/not_found_page"));

interface IRoute {
  id: number;
  display: string;
  path?: ((params: any) => void) | string;
  icon?: any;
  page?: LazyExoticComponent<() => JSX.Element>;
  layout?: (props: { children: JSX.Element }) => JSX.Element;
}

export const CRouteList: IRoute[] = [
  {
    id: 1,
    display: "Home",
    // path: CPath.home,
    // icon: HomeOutlined,
    page: HomePage,
  },
  {
    id: 2,
    display: "Movies",
    // path: CPath.movie,
    // icon: SlideshowOutlined,
    page: MoviePage,
  },
  {
    id: 3,
    display: "Tv Series",
    // path: CPath.tv,
    // icon: LiveTvOutlined,
    page: TvSeriesPage,
  },
  {
    id: 4,
    display: "Search",
    //   path: (mediaType: string) => CPath.search(mediaType),
    //   icon: SearchOutlined,
    page: SearchPage,
  },
  {
    id: 8,
    display: "404 Error Not Found",
    path: CPath.notFound,
    page: NotFoundPage,
  },
];

export const CAccountList: IRoute[] = [
  {
    id: 1,
    display: "Favorites",
    // path: CPath.favoriteList,
    // icon: FavoriteBorderOutlined,
    page: FavoritePage,
  },
  {
    id: 2,
    display: "Reviews",
    path: CPath.reviewList,
    icon: RateReviewOutlined,
  },
  {
    id: 3,
    display: "My Profile",
    path: CPath.profile,
    icon: LockResetOutlined,
  },
];
