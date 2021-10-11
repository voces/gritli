/// <reference path = "../../types.d.ts" />

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../helpers/persistStore.ts";
import {
  hasMaybeNumber,
  hasMaybeString,
  hasString,
  isArray,
  isRecord,
} from "../../helpers/typeguards.ts";
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

export const isConnections = (v: unknown): v is Connection[] =>
  isArray(v) && v.every(isConnection);

const secureStore = (connections: Connection[]) => {
  if (
    "credentials" in navigator && navigator.credentials && PasswordCredential
  ) {
    const clone = connections.map((c) => ({ ...c }));
    const passwords = JSON.stringify(clone.map((c) => c.password));
    clone.forEach((c) => delete c.password);
    store("connections", clone);
    const cred = new PasswordCredential({
      id: "Gritli",
      name: "Gritli connection passwords",
      password: passwords,
    });
    navigator.credentials.store(
      cred,
    );
  }
  store("connections", connections);
};

export const connectionsSlice = createSlice({
  name: "commands",
  initialState: [] as Connection[],
  reducers: {
    add: (state, action: PayloadAction<Connection>) => {
      state.push(action.payload);
      secureStore(state);
    },
    addMany: (state, action: PayloadAction<Connection[]>) => {
      state.push(...action.payload);
      secureStore(state);
    },
    remove: (state, action: PayloadAction<Connection | number>) => {
      state.splice(
        typeof action.payload === "number"
          ? action.payload
          : state.indexOf(action.payload),
        1,
      );
      secureStore(state);
    },
  },
});
