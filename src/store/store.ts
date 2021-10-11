import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { connectionsSlice } from "./slices/connectionsSlice.ts";
import { outputSlice } from "./slices/outputSlice.ts";
import { connectionSlice } from "./slices/connectionSlice.ts";
import { tabsSlice } from "./slices/tabsSlice.ts";

export const store = configureStore({
  reducer: combineReducers({
    commands: commandsSlice.reducer,
    connection: connectionSlice.reducer,
    connections: connectionsSlice.reducer,
    output: outputSlice.reducer,
    tabs: tabsSlice.reducer,
  }),
});

import "../commands/index.ts";
import "./initData.ts";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
