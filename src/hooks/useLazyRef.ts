import { React } from "../deps.ts";

export const useLazyRef = <T>(fn: () => T): React.MutableRefObject<T> => {
  const ref = React.useRef<T>();
  if (!ref.current) ref.current = fn();
  // deno-lint-ignore no-explicit-any
  return ref as any;
};
