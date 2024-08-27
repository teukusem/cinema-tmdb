export const detail = {
  getDetailData: (id: string | string[] | number | undefined) => `/movie/${id}`,
  recomendationMovie: (id: string | undefined) => `/tv/${id}/recommendations`,
};
