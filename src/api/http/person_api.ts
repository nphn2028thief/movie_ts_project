import {
  IPersonDetailResponse,
  IPersonMediaResponse,
} from "../../types/person";
import publicClient from "../client/public_client";

const personEndpoints = {
  personDetail: (personId: string) => `/person/${personId}`,
  mediaDetail: (personId: string) => `/person/medias/${personId}`,
};

const personApi = {
  getPersonDetail: (personId: string) => {
    return publicClient.get<IPersonDetailResponse>(
      personEndpoints.personDetail(personId)
    );
  },

  getPersonMedias: (personId: string) => {
    return publicClient.get<IPersonMediaResponse>(
      personEndpoints.mediaDetail(personId)
    );
  },
};

export default personApi;
