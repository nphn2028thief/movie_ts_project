import publicClient from "../client/public_client";

const genreEndpoints = {
  list: (mediaType: string) => `/genres/${mediaType}`,
};

const genreApi = {
  getGenres: async (mediaType: string) => {
    try {
      const response = await publicClient.get(genreEndpoints.list(mediaType));
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default genreApi;
