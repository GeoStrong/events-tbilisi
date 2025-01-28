export const makeFirstLetterUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const makeFirstLetterLowerCase = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
