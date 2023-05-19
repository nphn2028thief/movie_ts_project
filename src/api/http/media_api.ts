import { IMedia, IMediaResponse } from "../../types/media";
import publicClient from "../client/public_client";

const mediaEndpoints = {
  list: (mediaType: string, mediaCategory: string, page: number) =>
    `/${mediaType}/${mediaCategory}?page=${page}`,
  detail: (mediaType: string, mediaId: number) =>
    `/${mediaType}/detail/${mediaId}`,
  episode: (tvId: number, seasonNumber: number) =>
    `/tv/${tvId}/season/${seasonNumber}`,
  search: (mediaType: string, q: string, page: number) =>
    `/search/${mediaType}?query=${q}&page=${page}`,
};

const mediaApi = {
  getMediaList: (payload: IMedia) => {
    return publicClient.get<IMediaResponse>(
      mediaEndpoints.list(
        payload.mediaType,
        payload.mediaCategory,
        payload.page
      )
    );
  },

  getMediaDetail: (mediaType: string, mediaId: number) => {
    return publicClient.get(mediaEndpoints.detail(mediaType, mediaId));
  },

  getTvEpisde: (tvId: number, seasonNumber: number) => {
    return publicClient.get(mediaEndpoints.episode(tvId, seasonNumber));
  },

  searchMedia: async (mediaType: string, keyword: string, page: number) => {
    return publicClient.get<IMediaResponse>(
      mediaEndpoints.search(mediaType, keyword, page)
    );
  },
};

export default mediaApi;
