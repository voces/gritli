/// <reference path = "../types.d.ts" />

import { store } from "./store.ts";
import { connectionSlice } from "./slices/connectionSlice.ts";
import { retrieve } from "../helpers/persistStore.ts";
import { connectionsSlice, isConnections } from "./slices/connectionsSlice.ts";

(async () => {
  const connections = retrieve("connections", isConnections) ?? [];
  if (
    "credentials" in navigator && navigator.credentials && PasswordCredential
  ) {
    const credential = await navigator.credentials.get(
      { password: true },
    );
    if (credential && credential instanceof PasswordCredential) {
      const passwords = JSON.parse(credential.password ?? "[]") as string[];
      passwords.forEach((password, index) =>
        connections[index].password = password
      );
    }
  }
  store.dispatch(connectionsSlice.actions.addMany(connections));
  store.dispatch(
    connectionSlice.actions.selectConnection({
      connection: store.getState().connections[0],
    }),
  );
})();
