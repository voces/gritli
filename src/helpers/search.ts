const fuzzyRegexp = (str: string) => new RegExp(str.split("").join(".*"), "i");

export const fuzzyFilter = <T>(
  query: string,
  propAccessor: (value: T) => string,
) => {
  const regexp = fuzzyRegexp(query);
  return (value: T) => !!regexp.exec(propAccessor(value));
};
