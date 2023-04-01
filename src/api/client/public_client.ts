import axios, { AxiosError } from "axios";
import qs from "query-string";

const baseURL = "http://localhost:3000/api/v1";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => qs.stringify(params),
  },
});

publicClient.interceptors.request.use(
  (config: any) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
  (error) => Promise.reject(error)
);

publicClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: AxiosError) => Promise.reject(error.response?.data)
);

export default publicClient;
