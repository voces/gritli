import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Connection = {
  driver: "mysql";
  port?: number;
  username?: string;
  hostname?: string;
  password?: string;
  proxy?: string;
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState: {} as {
    connection: Connection | undefined;
    database: string | undefined;
    table: string | undefined;
  },
  reducers: {
    selectTable: (
      state,
      action: PayloadAction<
        { connection?: Connection; database?: string; table: string }
      >,
    ) => {
      state.connection = action.payload.connection ?? state.connection;
      state.database = action.payload.database ?? state.database;
      state.table = action.payload.table;
    },
    selectDatabase: (
      state,
      action: PayloadAction<
        {
          connection?: Connection;
          database: string;
          table?: string | undefined;
        }
      >,
    ) => {
      state.connection = action.payload.connection ?? state.connection;
      state.database = action.payload.database;
      if ("table" in action.payload) state.table = action.payload.table;
    },
    selectConnection: (
      state,
      action: PayloadAction<{ connection: Connection }>,
    ) => {
      state.connection = action.payload.connection;
    },
  },
});
