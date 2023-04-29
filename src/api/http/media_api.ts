import { IMedia } from "../../types/media";
import { mediaEndpoints } from "../../utils/endpoint";
import publicClient from "../client/public_client";

const mediaApi = {
  getMediaList: async (payload: IMedia) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list(
          payload.mediaType,
          payload.mediaCategory,
          payload.page
        )
      );

      return response.data.results;
    } catch (error) {
      return error;
    }
  },

  getMediaDetail: async (mediaType: string, mediaId: string) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.detail(mediaType, mediaId)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },

  searchMedia: async (mediaType: string, keyword: string, page: number) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search(mediaType, keyword, page)
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default mediaApi;
