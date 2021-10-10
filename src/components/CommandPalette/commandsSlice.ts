import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieve, store } from "../../helpers/persistStore.ts";
import { isStringArray } from "../../helpers/typeguards.ts";
import { BadgeColor } from "../vel/Badge.tsx";
import { Command } from "./types.ts";

type Option = {
  callback?: () => void;
  description?: string;
  hotkey?: string[];
  name: string;
  tags?: { label: string; color: BadgeColor }[];
};

const lru = <T>(array: T[], value: T, max?: number) => {
  const oldIndex = array.indexOf(value);
  if (oldIndex === 0) return;
  if (oldIndex > 0) array.splice(oldIndex, 1);
  array.unshift(value);
  if (max && array.length > max) array.pop();
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState: {
    commands: [] as Command[],
    shown: false,
    input: ">",
    placeholder: "",
    options: undefined as (undefined | ((query: string) => Option[])),
    callback: undefined as (
      | undefined
      | ((index: number, value: string, option?: Option) => void)
    ),
    showIndex: 0,
    forceOption: true,
    lru: (retrieve("commands.lru", isStringArray) ?? []),
  },
  reducers: {
    register: (state, action: PayloadAction<Command>) => {
      state.commands.push(action.payload);
    },
    hide: (state) => {
      state.shown = false;
    },
    show: (
      state,
      action?: PayloadAction<
        {
          input?: string;
          placeholder?: string;
          options?: (query: string) => Option[];
          callback?:
            | undefined
            | ((index: number, value: string, options?: Option) => void);
          forceOption?: boolean;
        }
      >,
    ) => {
      state.shown = true;
      state.input = action?.payload.input ?? "";
      state.placeholder = action?.payload.placeholder ?? "";
      state.options = action?.payload.options;
      state.callback = action?.payload.callback;
      state.showIndex++;
      state.forceOption = action?.payload.forceOption ?? !!state.options;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    metricUseCommand: (state, action: PayloadAction<string>) => {
      lru(state.lru, action.payload, 10);
      store("commands.lru", state.lru);
    },
  },
});
