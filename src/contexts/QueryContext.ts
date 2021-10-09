import { createContext } from "react";

export type Connection = {
  driver: "mysql";
  port?: number;
  username?: string;
  hostname?: string;
  password?: string;
};

type ContextData = {
  connections: Connection[];
  selected: Connection | undefined;
  database: string | undefined;
  table: string | undefined;
};

type FullContextData = ContextData & {
  patchState: (state: Partial<ContextData>) => void;
};

let globalState: ContextData = {
  connections: [],
  selected: undefined,
  database: undefined,
  table: undefined,
};

export const QueryContext = createContext<FullContextData>({
  ...globalState,
  patchState: (state) => {
    globalState = { ...globalState, ...state };
  },
});
