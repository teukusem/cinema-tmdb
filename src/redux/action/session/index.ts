export const setActionToken = (tokenUser: string | string[] | undefined) => {
  return {
    type: "SET_TOKEN",
    tokenUser,
  };
};

export const setActionModalAuth = (isOpenModalAuth: boolean) => {
  return {
    type: "SET_MODAL_AUTH",
    isOpenModalAuth,
  };
};

export const setSessionUserId = (sessionUserId: string) => {
  return {
    type: "SET_SESSION_ID",
    sessionUserId,
  };
};
