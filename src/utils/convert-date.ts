export const extractYear = (dateString: string | undefined) => {
  return dateString?.split("-")[0];
};
