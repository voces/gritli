import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieve, store } from "../helpers/persistStore.ts";
import {
  hasMaybeNumber,
  hasMaybeString,
  hasString,
  isArray,
  isRecord,
} from "../helpers/typeguards.ts";
import { Connection } from "./connectionSlice.ts";

const connectionKeys = new Set([
  "driver",
  "port",
  "username",
  "hostname",
  "password",
  "proxy",
]);

const isConnection = (v: unknown): v is Connection =>
  isRecord(v) &&
  Object.keys(v).every((k) => connectionKeys.has(k)) &&
  hasString(v, "driver") &&
  hasMaybeNumber(v, "port") &&
  hasMaybeString(v, "username") &&
  hasMaybeString(v, "hostname") &&
  hasMaybeString(v, "password") &&
  hasMaybeString(v, "proxy");

const isConnections = (v: unknown): v is Connection[] =>
  isArray(v) && v.every(isConnection);

export const connectionsSlice = createSlice({
  name: "commands",
  initialState: retrieve(
    "connections",
    isConnections,
  ) ?? [],
  reducers: {
    add: (state, action: PayloadAction<Connection>) => {
      state.push(action.payload);
      // if (!action.payload.password) {
      //   store("connections", state.filter((s) => !s.password));
      // }
      store("connections", state);
    },
    remove: (state, action: PayloadAction<Connection | number>) => {
      state.splice(
        typeof action.payload === "number"
          ? action.payload
          : state.indexOf(action.payload),
        1,
      );
      // store("connections", state.filter((s) => !s.password));
      store("connections", state);
    },
  },
});
