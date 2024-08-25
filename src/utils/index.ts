import axios, { Method } from "axios";

interface RequestParams {
  method: Method;
  url: string;
  data?: any;
}

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL_TMDB,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN || null}`,
  },
});

const axiosRequest = async <T>({
  method,
  url,
  data,
}: RequestParams): Promise<T> => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data as T;
  } catch (error) {
    throw error;
  }
};

export default axiosRequest;
