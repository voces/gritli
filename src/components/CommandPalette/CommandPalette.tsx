import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { commandsSlice } from "./commandsSlice.ts";
import { TextSelect } from "../TextSelect.tsx";

export const CommandPalette = () => {
  const [focusIndex, setFocusIndex] = useState(0);
  const {
    commands,
    input,
    shown,
    placeholder,
    options: getOptions,
    callback,
  } = useAppSelector((state) => state.commands);
  const dispatch = useAppDispatch();

  const options = getOptions(input);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    // Global hotkey to open command palette
    if (e.metaKey && e.shiftKey && e.code === "KeyP") {
      dispatch(
        commandsSlice.actions.show({
          input: ">",
          // The default options getter for the command palette
          options: (query: string) => {
            if (query[0] === ">") {
              query = query.slice(1);
              if (!query) return commands;
              const regexp = new RegExp(query.split("").join(".*"), "i");
              return commands.filter((c) => {
                const text = c.name + (c.description ?? "");
                const match = regexp.exec(text);
                return !!match;
              });
            }
            return [];
          },
        })
      );
      return;
    }
  }, []);

  // Install global listener
  useEffect(() => {
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, []);

  // Change the selected focus when hiding
  useEffect(() => {
    if (!shown) setFocusIndex(0);
  }, [shown]);

  if (!shown) return null;

  return (
    <TextSelect
      autoFocus={true}
      focusedOption={focusIndex}
      onClose={() => dispatch(commandsSlice.actions.hide())}
      onFocusOption={setFocusIndex}
      onInput={(v) => dispatch(commandsSlice.actions.setValue(v))}
      onSelect={(i) => {
        if (callback) return callback(i, input, options[i]);
        options[i].callback();
      }}
      options={options}
      placeholder={placeholder}
      value={input}
    />
  );
};
