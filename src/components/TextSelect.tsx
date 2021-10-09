import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePreviousValue } from "../hooks/usePreviousValue.ts";
import { theme } from "../theme.ts";
import { Badge, BadgeColor } from "./vel/Badge.tsx";

type Option = {
  description?: string;
  hotkey?: string[];
  name: React.ReactNode;
  tags?: { label: React.ReactNode; color: BadgeColor }[];
};

export const TextSelectOption = ({
  focused,
  onSelect,
  option,
}: {
  focused: boolean;
  onSelect: () => void;
  option: Option;
}) => (
  <div
    style={{
      padding: 4,
      ...theme.textSelect?.option,
      ...(focused ? theme.textSelect?.optionFocused : undefined),
    }}
    title={option.description}
    onClick={onSelect}
  >
    {option.tags?.map(({ label, color }) => (
      <Badge color={color} style={{ marginRight: 4 }}>
        {label}
      </Badge>
    ))}
    {option.name}
    {option.hotkey?.length && (
      <span style={{ float: "right" }}>
        {option.hotkey.map((key) => (
          <span
            style={{
              borderRadius: 2,
              fontSize: "80%",
              marginLeft: 3,
              padding: "3px 6px",
              ...theme.textSelect?.optionHotkey,
            }}
          >
            {key
              .replace("Key", "")
              .replace("!Meta", "⌘")
              .replace("!Shift", "⇧")
              .replace("!Alt", "⌥")}
          </span>
        ))}
      </span>
    )}
  </div>
);

type Props = {
  autoFocus?: boolean;
  focusedOption: number;
  onClose: () => void;
  onFocusOption: (index: number) => void;
  onInput: (newValue: string) => void;
  onSelect: (index: number) => void;
  options: Option[];
  placeholder?: string;
  value: string;
};

export const TextSelect = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      autoFocus,
      focusedOption,
      onClose,
      onFocusOption,
      onInput,
      onSelect,
      options,
      placeholder,
      value,
    }: Props,
    ref
  ) => {
    const myRef = useRef<HTMLInputElement | null>(null);
    const myRefPrevious = usePreviousValue(myRef.current);
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
      if (myRef.current && !myRefPrevious && autoFocus) myRef.current.focus();
    }, [autoFocus, myRef.current, myRefPrevious]);

    const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.code === "Escape") {
          onClose();
          return;
        }

        if (e.code === "ArrowDown") {
          onFocusOption(
            focusedOption === options.length - 1 ? 0 : focusedOption + 1
          );
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (e.code === "ArrowUp") {
          onFocusOption(
            focusedOption === options.length - 1 ? 0 : focusedOption + 1
          );
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (e.code === "Enter") {
          onSelect(focusedOption);
          return;
        }
      },
      [focusedOption, onSelect]
    );

    const onKeyDownPrev = usePreviousValue(onKeyDown);

    useEffect(() => {
      if (onKeyDown !== onKeyDownPrev) {
        globalThis.removeEventListener("keydown", onKeyDownPrev);
      }
      globalThis.addEventListener("keydown", onKeyDown);
      return () => globalThis.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
      <div
        style={{
          left: "50%",
          maxWidth: "90vw",
          padding: 4,
          position: "absolute",
          top: 0,
          transform: "translateX(-50%)",
          width: 600,
          ...theme.textSelect?.container,
        }}
      >
        <input
          onBlur={() => setInputFocused(false)}
          onFocus={() => setInputFocused(true)}
          onInput={(e) => onInput(e.currentTarget.value)}
          placeholder={placeholder}
          ref={(node) => {
            myRef.current = node;

            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "inherit",
            display: "block",
            fontFamily: "inherit",
            fontSize: "90%",
            outline: "none",
            padding: 4,
            width: "calc(100% - 10px)",
            ...theme.input,
            ...theme.textSelect?.input,
            ...(inputFocused ? theme.textSelect?.inputFocused : undefined),
          }}
          value={value}
        />
        {options.map((option, index) => (
          <TextSelectOption
            focused={focusedOption === index}
            onSelect={() => onSelect(index)}
            option={option}
          />
        ))}
      </div>
    );
  }
);
