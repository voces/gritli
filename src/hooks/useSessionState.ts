import { useEffect, useState } from "react";

export const store = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const retrieve = <T>(
  key: string,
  typeguard: (value: unknown) => value is T,
): T | undefined => {
  const raw = sessionStorage.getItem(key);
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

export const useSessionState = <T>(key: string, initial: T) => {
  const state = useState(
    () => retrieve(key, (_v): _v is T => true) ?? initial,
  );

  useEffect(() => store(key, state[0]), [state[0]]);

  return state;
};
