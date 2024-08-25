import axiosRequest from "@/utils";
import { API } from "@/utils/api/lists/index";
import type { NowPlayingMovieApiResponse } from "@/utils/types/home";

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
