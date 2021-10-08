import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Command } from "./types.ts";

export const commandsSlice = createSlice({
  name: "commands",
  initialState: {
    commands: [] as Command[],
    shown: false,
    input: ">",
    placeholder: "",
    // deno-lint-ignore no-unused-vars
    options: (query: string) => [] as Command[],
    callback: undefined as (
      | undefined
      | ((index: number, value: string, option?: Command) => void)
    ),
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
          options?: (query: string) => Command[];
          callback?:
            | undefined
            | ((index: number, value: string, options?: Command) => void);
        }
      >,
    ) => {
      state.shown = true;
      state.input = action?.payload.input ?? "";
      state.placeholder = action?.payload.placeholder ?? "";
      state.options = action?.payload.options ?? (() => []);
      state.callback = action?.payload.callback;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
});
