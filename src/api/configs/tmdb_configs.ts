import {
  EMediaCategory,
  EMediaType,
  IMediaCategory,
  IMediaType,
} from "../../types/media";

const mediaType: IMediaType = {
  movie: EMediaType.movie,
  tv: EMediaType.tv,
};

const mediaCategory: IMediaCategory = {
  latest: EMediaCategory.latest,
  popular: EMediaCategory.popular,
  top_rated: EMediaCategory.top_rated,
  now_playing: EMediaCategory.now_playing,
  upcoming: EMediaCategory.upcoming,
  airing_today: EMediaCategory.airing_today,
  on_the_air: EMediaCategory.on_the_air,
};

const backdropPath = (imgEndpoint: string) =>
  `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint: string) =>
  `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (mediaIdOrKey: string) =>
  `https://2embed.org/embed/${mediaIdOrKey}`;

const moviePath = (movieId: string) =>
  `https://2embed.org/embed/movie?tmdb=${movieId}`;

const tvPath = (tvId: string, season?: number, episode?: number) =>
  `https://2embed.org/embed/series?tmdb=${tvId}&s=${season}&e=${episode}`;

const tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
  moviePath,
  tvPath,
};

export default tmdbConfigs;
