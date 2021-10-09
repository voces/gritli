import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { Command } from "../components/CommandPalette/types.ts";
import { fuzzyFilter } from "../helpers/search.ts";
import { store } from "../store.ts";

store.dispatch(commandsSlice.actions.register({
  id: "commandPalette.show",
  name: "Show command palette",
  hotkey: ["!Meta", "!Shift", "KeyP"],
  // No point in showing this command, as the command palette is already shown
  hidden: true,
  callback: () => {
    store.dispatch(commandsSlice.actions.show({
      input: ">",
      // The default options getter for the command palette
      options: (query: string) => {
        if (query[0] === ">") {
          query = query.slice(1);
          const commands = store.getState().commands.commands;
          if (!query) return commands.filter((c) => !c.hidden);
          const matcher = fuzzyFilter(
            query,
            (c: Command) => c.name + (c.description ?? ""),
          );
          return commands.filter((c) => !c.hidden && matcher(c));
        }
        return [];
      },
    }));
  },
}));
