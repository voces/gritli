import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { commandsSlice } from "./components/CommandPalette/commandsSlice.ts";
import { connectionsSlice } from "./features/connectionsSlice.ts";
import { outputSlice } from "./features/outputSlice.ts";
import { connectionSlice } from "./features/connectionSlice.ts";
import { tabsSlice } from "./features/tabsSlice.ts";

export const store = configureStore({
  reducer: combineReducers({
    commands: commandsSlice.reducer,
    connection: connectionSlice.reducer,
    connections: connectionsSlice.reducer,
    output: outputSlice.reducer,
    tabs: tabsSlice.reducer,
  }),
});

import "./commands/index.ts";

store.dispatch(
  connectionSlice.actions.selectConnection({
    connection: store.getState().connections[0],
  }),
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
