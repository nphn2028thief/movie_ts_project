import axios, { AxiosError } from "axios";
import qs from "query-string";

const baseURL =
  import.meta.env.VITE_REACT_NODE_ENV === "development"
    ? import.meta.env.VITE_REACT_DEV_API_URL
    : import.meta.env.VITE_REACT_API_URL;

const controller = new AbortController();

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
      signal: controller.signal,
    };
  },
  (error) => Promise.reject(error)
);

publicClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) {
    //   return response.data;
    // }

    return response;
  },
  (error: AxiosError) => Promise.reject(error.response?.data)
);

export default publicClient;
