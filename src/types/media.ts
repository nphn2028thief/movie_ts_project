export enum EMediaType {
  movie = "movie",
  tv = "tv",
}

export enum EMediaCategory {
  latest = "latest",
  popular = "popular",
  top_rated = "top_rated",
  now_playing = "now_playing",
  upcoming = "upcoming",
  airing_today = "airing_today",
  on_the_air = "on_the_air",
}

export interface IMediaType {
  movie: string;
  tv: string;
}

export interface IMediaCategory {
  latest: string;
  popular: string;
  top_rated: string;
  now_playing?: string;
  upcoming?: string;
  airing_today?: string;
  on_the_air?: string;
}

export interface ICategory {
  id: number;
  name: string;
  category: string;
}

export interface IMedia {
  mediaType: string;
  mediaCategory: string;
  page: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreList {
  genres: IGenre[];
}
