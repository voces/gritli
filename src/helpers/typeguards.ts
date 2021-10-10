export const isRecord = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object";

export const isArray = (v: unknown): v is Array<unknown> => Array.isArray(v);
export const isString = (v: unknown): v is string => typeof v === "string";
export const isNumber = (v: unknown): v is number => typeof v === "number";

export const has = <T extends Record<string, unknown>, K extends string, U>(
  v: T,
  k: K,
  typeguard: (v: unknown) => v is U,
): v is T & { [k in K]: U } => k in v && typeguard(v[k]);

export const hasNumber = <T extends Record<string, unknown>, K extends string>(
  v: T,
  k: K,
): v is T & { [k in K]: number } => k in v && typeof v[k] === "number";

export const hasString = <T extends Record<string, unknown>, K extends string>(
  v: T,
  k: K,
): v is T & { [k in K]: string } => k in v && typeof v[k] === "string";

export const hasMaybeString = <
  T extends Record<string, unknown>,
  K extends string,
>(
  v: T,
  k: K,
): v is T & { [k in K]: string | undefined } =>
  k in v ? (typeof v[k] === "string" || v[k] == null) : true;

export const hasMaybeNumber = <
  T extends Record<string, unknown>,
  K extends string,
>(
  v: T,
  k: K,
): v is T & { [k in K]: string | undefined } =>
  k in v ? (typeof v[k] === "number" || v[k] == null) : true;

export const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((v) => typeof v === "string");
