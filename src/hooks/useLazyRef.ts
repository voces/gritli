import { React } from "../deps.ts";

export const useLazyRef = <T>(fn: () => T): React.MutableRefObject<T> => {
  const ref = React.useRef<T>();
  if (!ref.current) ref.current = fn();
  return ref as any;
};
