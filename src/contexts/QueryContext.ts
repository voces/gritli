import { React } from "../deps.ts";

export type Connection = {
  driver: "mysql";
  port?: number;
  username?: string;
  hostname?: string;
};

export const QueryContext = React.createContext<{
  connections: Connection[];
  selected: Connection | undefined;
}>({ connections: [], selected: undefined });
