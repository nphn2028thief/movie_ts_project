import privateClient from "../client/private_client";

const favoriteEndpoints = {
  myFavorite: "/favorites",
  add: "/favorites",
  delete: (favoriteId: string) => `favorite/${favoriteId}`,
};

const favoriteApi = {
  getMyFavorite: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.myFavorite);
      return response;
    } catch (error) {
      return error;
    }
  },

  addFavorite: async (mediaId: string) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, mediaId);
      return response;
    } catch (error) {
      return error;
    }
  },

  deleteFavorite: async (favoriteId: string) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.delete(favoriteId)
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default favoriteApi;
