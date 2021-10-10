import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieve, store } from "../helpers/persistStore.ts";
import { isNumber, isStringArray } from "../helpers/typeguards.ts";

const initialQueryTabs = retrieve("tabs.queryTabs", isStringArray) ??
  [] as string[];

if (!initialQueryTabs.length) initialQueryTabs.push("SELECT 1+1;");

export const tabsSlice = createSlice({
  name: "output",
  initialState: {
    queryTabCount: initialQueryTabs.length,
    queryTabs: initialQueryTabs,
    selected: retrieve("tabs.selected", isNumber) ?? 0,
  },
  reducers: {
    newTab: (state, query: PayloadAction<string | undefined>) => {
      state.queryTabs.push(query.payload ?? "");
      state.queryTabCount++;
      store("tabs.queryTabs", state.queryTabs);
    },
    selectTab: (state, action: PayloadAction<number>) => {
      let index = action.payload;
      if (index >= state.queryTabCount + 2) {
        index = state.queryTabCount + 2;
        state.queryTabs.push("");
        state.queryTabCount++;
        store("tabs.queryTabs", state.queryTabs);
      }
      state.selected = index;
      store("tabs.selected", index);
    },
    closeTab: (state, action: PayloadAction<number>) => {
      if (action.payload < 2) return; // reserved for table + data
      state.queryTabs.splice(action.payload - 2, 1);
      state.queryTabCount--;
      store("tabs.queryTabs", state.queryTabs);
      if (action.payload < state.selected) {
        state.selected -= 1;
        store("tabs.selected", state.selected);
      }
    },
    updateTab: (
      state,
      action: PayloadAction<{ id: number; value: string }>,
    ) => {
      state.queryTabs[action.payload.id] = action.payload.value;
      store("tabs.queryTabs", state.queryTabs);
    },
  },
});
