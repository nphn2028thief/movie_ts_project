import { EMediaCategory } from "../types/media";

export interface IMediaHeader {
  id: number;
  name: string;
  category: string;
}

export const movieCategories: IMediaHeader[] = [
  {
    id: 1,
    name: "Popular",
    category: EMediaCategory.popular,
  },
  {
    id: 2,
    name: "Now Playing",
    category: EMediaCategory.now_playing,
  },
  {
    id: 3,
    name: "Upcoming",
    category: EMediaCategory.upcoming,
  },
  {
    id: 4,
    name: "Top Rated",
    category: EMediaCategory.top_rated,
  },
];

export const tvCategories: IMediaHeader[] = [
  {
    id: 1,
    name: "Popular",
    category: EMediaCategory.popular,
  },
  {
    id: 2,
    name: "Airing Today",
    category: EMediaCategory.airing_today,
  },
  {
    id: 3,
    name: "On TV",
    category: EMediaCategory.on_the_air,
  },
  {
    id: 4,
    name: "Top Rated",
    category: EMediaCategory.top_rated,
  },
];
