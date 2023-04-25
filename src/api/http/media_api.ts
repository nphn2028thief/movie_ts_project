import publicClient from "../client/public_client";

const mediaEndpoints = {
  list: (mediaType: string, mediaCategory: string, page: number) =>
    `/${mediaType}/${mediaCategory}?page=${page}`,
  detail: (mediaType: string, mediaId: string) =>
    `/${mediaType}/detail/${mediaId}`,
  search: (mediaType: string, q: string, page: number) =>
    `/${mediaType}?query=${q}&page=${page}`,
};

const mediaApi = {
  getMediaList: async (
    mediaType: string,
    mediaCategory: string,
    page: number
  ) => {
    try {
      const response = await publicClient.get<any[]>(
        mediaEndpoints.list(mediaType, mediaCategory, page)
      );

      return response.data;
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
