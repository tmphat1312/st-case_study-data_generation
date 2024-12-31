export const toTitleCase = (str: string) =>
  str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

export const makeFirstLetterCapital = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
