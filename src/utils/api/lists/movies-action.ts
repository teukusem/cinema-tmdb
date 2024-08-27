const ACCOUNT_ID = process.env.ACC_ID;

export const moviesAction = {
  addFavorite: (session_id: string) =>
    `account/${ACCOUNT_ID}/favorite?session_id=${session_id}`,
  addWatchlist: (session_id: string) =>
    `account/${ACCOUNT_ID}/watchlist?session_id=${session_id}`,
  getListFavorite: (session_id: string) =>
    `account/${ACCOUNT_ID}/favorite/movies?page=1&session_id=${session_id}`,
  getWatchList: (session_id: string) =>
    `account/${ACCOUNT_ID}/watchlist/movies?page=1&session_id=${session_id}`,
};
