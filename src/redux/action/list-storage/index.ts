export const setActionWatchlistId = (watchListId: number) => {
  return {
    type: "SET_WATCHLIST_ID",
    watchListId,
  };
};

export const setActionFavoritelistId = (favoriteListId: number) => {
  return {
    type: "SET_FAVORITE_ID",
    favoriteListId,
  };
};
