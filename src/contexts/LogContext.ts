import { React } from "../deps.ts";

export const LogContext = React.createContext<{
  log: { node: React.ReactNode; key: string }[];
  append: (log: React.ReactNode) => void;
}>({ log: [], append: () => {} });
