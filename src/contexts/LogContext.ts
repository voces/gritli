import { createContext } from "react";

export const LogContext = createContext<{
  log: { node: React.ReactNode; key: string }[];
  append: (log: React.ReactNode) => void;
}>({ log: [], append: () => {} });
