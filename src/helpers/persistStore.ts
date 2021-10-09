export const store = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieve = <T>(
  key: string,
  typeguard: (value: unknown) => value is T,
): T | undefined => {
  const raw = localStorage.getItem(key);
  if (!raw) return;

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (err) {
    console.warn(err);
    return;
  }

  if (typeguard(json)) {
    return json;
  }
};
