export const detail = {
  getDetailData: (id: string | string[] | undefined) => `/movie/${id}`,
  recomendationMovie: (id: string | undefined) => `/tv/${id}/recommendations`,
};
