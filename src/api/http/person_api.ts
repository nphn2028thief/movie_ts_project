import publicClient from "../client/public_client";

const personEndpoints = {
  personDetail: (personId: string) => `/person/${personId}`,
  mediaDetail: (personId: string) => `/person/medias/${personId}`,
};

const personApi = {
  getPersonDetail: async (personId: string) => {
    try {
      const response = await publicClient.get(
        personEndpoints.personDetail(personId)
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  getPersonMedias: async (personId: string) => {
    try {
      const response = await publicClient.get(
        personEndpoints.mediaDetail(personId)
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default personApi;
