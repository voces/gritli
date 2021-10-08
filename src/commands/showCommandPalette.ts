import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { store } from "../store.ts";

store.dispatch(commandsSlice.actions.register({
  id: "commandPalette.show",
  name: "Show command palette",
  hotkey: ["!Meta", "!Shift", "KeyP"],
  hidden: true,
  callback: () => {
    console.log("showing");
    store.dispatch(commandsSlice.actions.show({
      input: ">",
      // The default options getter for the command palette
      options: (query: string) => {
        if (query[0] === ">") {
          query = query.slice(1);
          const commands = store.getState().commands.commands;
          if (!query) return commands.filter((c) => !c.hidden);
          const regexp = new RegExp(query.split("").join(".*"), "i");
          return commands.filter((c) => {
            if (c.hidden) return false;
            const text = c.name + (c.description ?? "");
            const match = regexp.exec(text);
            return !!match;
          });
        }
        return [];
      },
    }));
  },
}));
