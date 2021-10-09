import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { connectionsSlice } from "../features/connectionsSlice.ts";
import { formatConnection } from "../helpers/formatConnection.ts";
import { fuzzyFilter } from "../helpers/search.ts";
import { hasNumber } from "../helpers/typeguards.ts";
import { store } from "../store.ts";

store.dispatch(commandsSlice.actions.register({
  id: "connections.remove",
  name: "Remove connection",
  description: "Removes a server to connect to",
  tags: [{ label: "Connections", color: "red" }],
  callback: () => {
    store.dispatch(commandsSlice.actions.show({
      placeholder: "Connection to remove",
      options: (query) => {
        const fuzzy = fuzzyFilter(
          query,
          (c: { name: string; id: number }) => c.name,
        );
        return store.getState().connections.map((c) =>
          formatConnection(c, true)
        )
          .map((name, id) => ({ name, id })).filter(fuzzy);
      },
      callback: (_, _2, opt) => {
        if (opt && hasNumber(opt, "id")) {
          store.dispatch(
            connectionsSlice.actions.remove(
              store.getState().connections[opt.id],
            ),
          );
        }
        store.dispatch(commandsSlice.actions.hide());
      },
    }));
  },
}));
