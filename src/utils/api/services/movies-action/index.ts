import axiosRequest from "@/utils";
import { API } from "@/utils/api/lists/index";

interface PayloadMovies {
  media_type: string;
  media_id: number;
  favorite?: boolean;
  watchlist?: boolean;
}

export const addWatchlist = async (
  payload: PayloadMovies,
  session_id: string
): Promise<any> => {
  const response = await axiosRequest<any>({
    url: API.moviesAction.addWatchlist(session_id),
    method: "POST",
    data: payload,
  });

  return response;
};

export const addFavorite = async (
  payload: PayloadMovies,
  session_id: string
): Promise<any> => {
  const response = await axiosRequest<any>({
    url: API.moviesAction.addFavorite(session_id),
    method: "POST",
    data: payload,
  });

  return response;
};

export const getListFavorite = async (session_id: string): Promise<any> => {
  const response = await axiosRequest<any>({
    url: API.moviesAction.getListFavorite(session_id),
    method: "GET",
  });

  return response;
};

export const getWatchList = async (session_id: string): Promise<any> => {
  const response = await axiosRequest<any>({
    url: API.moviesAction.getWatchList(session_id),
    method: "GET",
  });

  return response;
};
