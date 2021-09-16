export const isRecord = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object";

export const isArray = (v: unknown): v is Array<unknown> => Array.isArray(v);
