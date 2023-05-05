import { IFavorite, IPayloadAddFavorite } from "../../types/favorite";
import privateClient from "../client/private_client";

const favoriteEndpoints = {
  check: "/favorites/check",
  myFavorite: "/favorites",
  add: "/favorites",
  delete: (favoriteId: string) => `favorite/${favoriteId}`,
};

const favoriteApi = {
  checkFavorite: (mediaId: number) => {
    return privateClient.post<{ message: boolean }>(favoriteEndpoints.check, {
      mediaId,
    });
  },

  getMyFavorite: () => {
    return privateClient.get<IFavorite[]>(favoriteEndpoints.myFavorite);
  },

  addFavorite: (payload: IPayloadAddFavorite) => {
    return privateClient.post<{ message: string; data: IFavorite }>(
      favoriteEndpoints.add,
      payload
    );
  },

  deleteFavorite: (favoriteId: string) => {
    return privateClient.delete<{ message: string; favoriteId: string }>(
      favoriteEndpoints.delete(favoriteId)
    );
  },
};

export default favoriteApi;
