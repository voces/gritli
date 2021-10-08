import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { store } from "../store.ts";

store.dispatch(commandsSlice.actions.register({
  id: "connections.add",
  name: "Add connection",
  description: "Adds a MySQL server to connect to",
  hotkey: ["Alt", "N"],
  tags: [{ label: "Connections", color: "red" }],
  callback: () => {
    store.dispatch(commandsSlice.actions.show({
      placeholder: "Username",
      callback: (_, username) => {
        store.dispatch(commandsSlice.actions.show({
          placeholder: "Hostname",
          callback: (_, hostname) => {
            store.dispatch(commandsSlice.actions.show({
              placeholder: "Port (default 3306)",
              callback: (_, port) => {
                if (!port) port = "3306";
                store.dispatch(commandsSlice.actions.show({
                  placeholder: "Password",
                  callback: (_, password) => {
                    console.log(username, hostname, port, password);
                    store.dispatch(commandsSlice.actions.hide());
                  },
                }));
              },
            }));
          },
        }));
      },
    }));
  },
}));

store.dispatch(commandsSlice.actions.register({
  id: "connections.add2",
  name: "Add connection2",
  description: "Adds a MySQL server to connect to",
  hotkey: ["Alt", "N"],
  tags: [{ label: "Connections", color: "red" }],
  callback: () => {
    store.dispatch(commandsSlice.actions.show({
      placeholder: "Hostname",
      callback: (_, hostname) => {
        console.log("hostname is", hostname);
      },
    }));
  },
}));
