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
