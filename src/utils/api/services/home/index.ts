import axiosRequest from "@/utils";
import { API } from "@/utils/api/lists/index";
import type {
  NowPlayingMovieApiResponse,
  RequestSessionResponse,
  RequestTokenResponse,
  ValidateTokenPayload,
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

export const searchValue = async (
  payload: string
): Promise<NowPlayingMovieApiResponse> => {
  const response = await axiosRequest<NowPlayingMovieApiResponse>({
    url: API.home.searchValue(payload),
    method: "GET",
  });

  return response;
};

export const requestToken = async () => {
  const response = await axiosRequest<RequestTokenResponse>({
    url: API.home.requestToken,
    method: "GET",
  });
  const urlReplace = `https://www.themoviedb.org/authenticate/${response?.request_token}?redirect_to=https://cinema-tmdb-sigma.vercel.app/`;
  return window.location.replace(urlReplace);
};

export const validateToken = async (
  payload: ValidateTokenPayload
): Promise<RequestTokenResponse> => {
  const response = await axiosRequest<RequestTokenResponse>({
    url: API.home.validateToken,
    method: "POST",
    data: payload,
  });
  return response;
};

export const createSession = async (payload: {
  request_token: string;
}): Promise<RequestSessionResponse> => {
  const response = await axiosRequest<RequestSessionResponse>({
    url: API.home.createSession,
    method: "POST",
    data: payload,
  });
  return response;
};
