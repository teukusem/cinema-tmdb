import axiosRequest from "@/utils";
import { API } from "@/utils/api/lists/index";
import type {
  NowPlayingMovieApiResponse,
  RequestTokenResponse,
} from "@/utils/types/home";

export const getListNowPlaying = async (
  payload: number
): Promise<NowPlayingMovieApiResponse> => {
  const response = await axiosRequest<NowPlayingMovieApiResponse>({
    url: API.home.nowPlaying(payload),
    method: "GET",
  });

  return response;
};

export const getListTopRated = async (
  payload: number
): Promise<NowPlayingMovieApiResponse> => {
  const response = await axiosRequest<NowPlayingMovieApiResponse>({
    url: API.home.topRated(payload),
    method: "GET",
  });

  return response;
};

export const requestToken = async () => {
  const response = await axiosRequest<RequestTokenResponse>({
    url: API.home.requestToken,
    method: "GET",
  });
  const urlReplace = `https://www.themoviedb.org/authenticate/${response?.request_token}?redirect_to=http://localhost:3000/`;
  return window.location.replace(urlReplace);
};
