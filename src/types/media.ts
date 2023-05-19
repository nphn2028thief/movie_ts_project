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

// export interface ICategory {
//   id: number;
//   name: string;
//   category: string;
// }

// Type for payload getMediaList API
export interface IMedia {
  mediaType: string;
  mediaCategory: string;
  page: number;
}

// Response for getGenreList API
export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreList {
  genres: IGenre[];
}

// Response for getMediaList API
export interface IMediaResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMediaResponse {
  page: number;
  results: IMediaResult[];
  total_pages: number;
  total_results: number;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
}

// Get video trailer from mediaDetail.videos.results
export interface IVideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: string;
  published_at: string;
  id: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface IBackdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IMediaPayload {
  mediaType: string;
  mediaId: number;
}

export interface IMediaPayloadSearch {
  mediaType: string;
  keyword: string;
  page: number;
}
