import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { retrieve, store } from "../../helpers/persistStore.ts";
import { isNumber, isRecord } from "../../helpers/typeguards.ts";
import { Command } from "./types.ts";
import type { HTMLInputTypeAttribute } from "react";

type Option = {
  callback?: () => void;
  description?: string;
  hotkey?: string[];
  name: string;
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState: {
    commands: [] as Command[],
    commandMap: {} as Record<string, Command | undefined>,
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
    usage: (retrieve("commands.usage", (v): v is Record<string, number> =>
      isRecord(v) && Object.values(v).every(isNumber)) ?? {}),
    type: "text" as HTMLInputTypeAttribute,
  },
  reducers: {
    register: (state, action: PayloadAction<Command>) => {
      state.commands.push(action.payload);
      state.commandMap[action.payload.id] = action.payload;
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
          type?: HTMLInputTypeAttribute;
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
      state.type = action?.payload.type ?? "text";
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    metricUseCommand: (state, action: PayloadAction<string>) => {
      state.usage[action.payload] = Date.now();
      store("commands.usage", state.usage);
    },
  },
});
