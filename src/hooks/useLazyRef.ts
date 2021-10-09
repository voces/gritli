import { useRef } from "react";

export const useLazyRef = <T>(fn: () => T): React.MutableRefObject<T> => {
  const ref = useRef<T>();
  if (!ref.current) ref.current = fn();
  // deno-lint-ignore no-explicit-any
  return ref as any;
};
