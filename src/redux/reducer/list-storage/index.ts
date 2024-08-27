const initialState = {
  watchListId: [],
  favoriteListId: [],
};

export default function listStorageReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_WATCHLIST_ID":
      return {
        ...state,
        watchListId: action.watchListId,
      };
    case "SET_FAVORITE_ID":
      return {
        ...state,
        favoriteListId: action.favoriteListId,
      };
    default:
      return state;
  }
}
