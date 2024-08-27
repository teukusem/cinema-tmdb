const initialState = {
  sessionUserId: null,
  tokenUser: null,
  isOpenModalAuth: false,
};

export default function userAuthenticationReducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        tokenUser: action.tokenUser,
      };
    case "SET_MODAL_AUTH":
      return {
        ...state,
        isOpenModalAuth: action.isOpenModalAuth,
      };
    case "SET_SESSION_ID":
      return {
        ...state,
        sessionUserId: action.sessionUserId,
      };
    default:
      return state;
  }
}
