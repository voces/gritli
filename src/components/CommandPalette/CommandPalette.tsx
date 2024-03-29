import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { commandsSlice } from "./commandsSlice.ts";
import { TextSelect } from "../TextSelect.tsx";
import { usePreviousValue } from "../../hooks/usePreviousValue.ts";

export const CommandPalette = () => {
  const [focusIndex, setFocusIndex] = useState(0);
  const {
    callback,
    commands,
    forceOption,
    input,
    options: getOptions,
    placeholder,
    showIndex,
    shown,
    type,
  } = useAppSelector((state) => state.commands);
  const dispatch = useAppDispatch();

  const options = getOptions?.(input) ?? [];

  // Global hotkey command runner
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const command = commands.find((command) => {
      const codes = command.hotkey;
      if (!codes?.length) return false;

      if (e.metaKey === !codes.includes("!Meta")) return false;
      if (e.shiftKey === !codes.includes("!Shift")) return false;
      if (e.altKey === !codes.includes("!Alt")) return false;
      if (e.ctrlKey === !codes.includes("!Ctrl")) return false;

      const code = command.hotkey!.find((v) => v[0] !== "!");
      return e.code === code;
    });

    command?.callback();
  }, []);

  // Install global listener
  useEffect(() => {
    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, []);

  const previousShowIndex = usePreviousValue(showIndex);

  // Change the selected focus when hiding
  useEffect(() => {
    if (!shown || previousShowIndex !== showIndex) setFocusIndex(0);
  }, [shown, showIndex]);

  // If options are refined, ensure something is still selected
  useEffect(() => {
    if (focusIndex >= options.length && focusIndex > 0) {
      setFocusIndex(Math.max(options.length - 1, 0));
    }
  }, [input]);

  if (!shown) return null;

  return (
    <TextSelect
      autoFocus={true}
      focusedOption={focusIndex}
      onClose={() => dispatch(commandsSlice.actions.hide())}
      onFocusOption={setFocusIndex}
      onInput={(v) => dispatch(commandsSlice.actions.setValue(v))}
      onSelect={(i) => {
        if (!options[i] && forceOption) return;
        if (callback) return callback(i, input, options[i]);
        options[i].callback?.();
      }}
      options={options}
      placeholder={placeholder}
      type={type}
      value={input}
    />
  );
};
