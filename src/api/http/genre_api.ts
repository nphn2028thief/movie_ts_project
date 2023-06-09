import { IGenreList } from "../../types/media";
import publicClient from "../client/public_client";

const genreEndpoints = {
  list: (mediaType: string) => `/genre/${mediaType}/list`,
};

const genreApi = {
  getGenreList: (mediaType: string) => {
    return publicClient.get<IGenreList>(genreEndpoints.list(mediaType));
  },
};

export default genreApi;
