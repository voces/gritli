import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { connectionsSlice } from "../features/connectionsSlice.ts";
import { store } from "../store.ts";

store.dispatch(commandsSlice.actions.register({
  id: "connections.add",
  name: "Add connection",
  description: "Adds a MySQL server to connect to",
  hotkey: ["!Alt", "KeyN"],
  callback: () => {
    store.dispatch(commandsSlice.actions.show({
      placeholder: "Username (default root)",
      callback: (_, username) => {
        store.dispatch(commandsSlice.actions.show({
          placeholder: "Hostname (default localhost)",
          callback: (_, hostname) => {
            store.dispatch(commandsSlice.actions.show({
              placeholder: "Port (default 3306)",
              callback: (_, port) => {
                if (!port) port = "3306";
                else if (isNaN(parseInt(port))) return;
                store.dispatch(commandsSlice.actions.show({
                  placeholder: "Password",
                  type: "password",
                  callback: (_, password) => {
                    store.dispatch(commandsSlice.actions.show({
                      placeholder: "Proxy (default http://localhost:3000)",
                      callback: (_, proxy) => {
                        store.dispatch(commandsSlice.actions.hide());
                        store.dispatch(connectionsSlice.actions.add({
                          driver: "mysql",
                          username: username || "root",
                          hostname: hostname || "localhost",
                          password: password || undefined,
                          port: port.length ? parseInt(port) : undefined,
                          proxy: proxy || "http://localhost:3000",
                        }));
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
  },
}));
