export const home = {
  nowPlaying: (page: number) => `movie/now_playing?page=${page}`,
  topRated: (page: number) => `movie/top_rated?page=${page}`,
  requestToken: `authentication/token/new`,
  validateToken: `authentication/token/validate_with_login`,
  createSession: `authentication/session/new`,
};
