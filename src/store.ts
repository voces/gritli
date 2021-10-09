import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commandsSlice } from "./components/CommandPalette/commandsSlice.ts";
import { connectionsSlice } from "./features/connectionsSlice.ts";
import { outputSlice } from "./features/outputSlice.ts";

export const store = configureStore({
  reducer: combineReducers({
    commands: commandsSlice.reducer,
    connections: connectionsSlice.reducer,
    output: outputSlice.reducer,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import "./commands/index.ts";
