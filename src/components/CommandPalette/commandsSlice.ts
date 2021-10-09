import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BadgeColor } from "../vel/Badge.tsx";
import { Command } from "./types.ts";

type Option = {
  callback?: () => void;
  description?: string;
  hotkey?: string[];
  name: string;
  tags?: { label: string; color: BadgeColor }[];
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
  },
});
