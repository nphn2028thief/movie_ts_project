import axios, { AxiosError } from "axios";
import qs from "query-string";

const baseURL = "http://localhost:5000/api/v1";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => qs.stringify(params),
  },
});

privateClient.interceptors.request.use(
  (config: any) => {
    const controller = new AbortController();

    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      signal: controller.abort(),
    };
  },
  (error) => Promise.reject(error)
);

privateClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) {
    //   return response.data;
    // }

    return response;
  },
  (error: AxiosError) => Promise.reject(error.response?.data)
);

export default privateClient;
