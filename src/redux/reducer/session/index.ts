interface UserAuthenticationState {
  sessionUser: string | null;
  tokenUser: string | null;
  isOpenModalAuth: boolean | undefined;
}

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
    default:
      return state;
  }
}
