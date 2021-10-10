import { commandsSlice } from "../components/CommandPalette/commandsSlice.ts";
import { tabsSlice } from "../features/tabsSlice.ts";
import { store } from "../store.ts";

store.dispatch(commandsSlice.actions.register({
  id: "tabs.closeTab",
  name: "Close current tab",
  hotkey: ["!Alt", "KeyW"],
  callback: () => {
    store.dispatch(tabsSlice.actions.closeTab(store.getState().tabs.selected));
  },
}));

store.dispatch(commandsSlice.actions.register({
  id: "tabs.newTab",
  name: "Open new tab",
  hotkey: ["!Alt", "KeyT"],
  callback: () => {
    store.dispatch(tabsSlice.actions.newTab());
    store.dispatch(
      tabsSlice.actions.selectTab(store.getState().tabs.queryTabCount + 1),
    );
  },
}));

Array(10).fill(0).map((_, i) => {
  const code = i === 9 ? 10 : i + 1;
  store.dispatch(commandsSlice.actions.register({
    id: "tabs.showTab" + code,
    name: "Show tab " + code,
    hotkey: ["!Alt", "Digit" + (i === 9 ? 0 : i + 1)],
    callback: () => {
      store.dispatch(tabsSlice.actions.selectTab(i));
    },
  }));
});
