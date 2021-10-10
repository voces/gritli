import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { Command } from "../components/CommandPalette/types.ts";
import { fuzzyFilter } from "../helpers/search.ts";
import { hasString } from "../helpers/typeguards.ts";
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

          const commandsSlice = store.getState().commands;
          const sort = (a: Command, b: Command) =>
            (commandsSlice.lru.indexOf(b.id) ?? -Infinity) -
            (commandsSlice.lru.indexOf(a.id) ?? -Infinity);

          if (!query) {
            return commandsSlice.commands.filter((c) => !c.hidden).sort(sort);
          }

          const matcher = fuzzyFilter(
            query,
            (c: Command) =>
              [...(c.tags ?? []), c.name, c.description].filter((v) => v).join(
                " ",
              ),
          );

          return commandsSlice.commands.filter((c) => !c.hidden && matcher(c))
            .sort(sort);
        }
        return [];
      },
      callback: (_, _2, command) => {
        store.dispatch(commandsSlice.actions.hide());
        if (command && hasString(command, "id")) {
          store.dispatch(commandsSlice.actions.metricUseCommand(command.id));
          command?.callback!();
        }
      },
    }));
  },
}));
