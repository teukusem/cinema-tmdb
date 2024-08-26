import axiosRequest from "@/utils";
import { API } from "@/utils/api/lists/index";
import { MovieDetails, RecomendationResponse } from "@/utils/types/detail";

export const getDetailData = async (
  payload: string | string[] | undefined
): Promise<MovieDetails> => {
  const response = await axiosRequest<MovieDetails>({
    url: API.detail.getDetailData(payload),
    method: "GET",
  });

  return response;
};

export const recomendationMovie = async (
  payload: string | undefined
): Promise<RecomendationResponse> => {
  const response = await axiosRequest<RecomendationResponse>({
    url: API.detail.recomendationMovie(payload),
    method: "GET",
  });

  return response;
};
