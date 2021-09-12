import { React } from "../deps.ts";

export type Connection = {
  driver: "mysql";
  port?: number;
  username?: string;
  hostname?: string;
};

type ContextData = {
  connections: Connection[];
  selected: Connection | undefined;
  database: string | undefined;
};

type FullContextData = ContextData & {
  patchState: (state: Partial<ContextData>) => void;
};

let globalState: ContextData = {
  connections: [],
  selected: undefined,
  database: undefined,
};

export const QueryContext = React.createContext<FullContextData>({
  ...globalState,
  patchState: (state) => {
    globalState = { ...globalState, ...state };
  },
});
