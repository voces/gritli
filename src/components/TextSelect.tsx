import React, {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePreviousValue } from "../hooks/usePreviousValue.ts";
import { theme } from "../theme.ts";
import { Badge, BadgeColor } from "./vel/Badge.tsx";

type Option = {
  description?: string;
  hotkey?: string[];
  name: React.ReactNode;
};

export const TextSelectOption = ({
  focused,
  onSelect,
  option,
  onFocus,
}: {
  focused: boolean;
  onSelect: () => void;
  option: Option;
  onFocus: () => void;
}) => (
  <div
    style={{
      padding: "4px 11px",
      cursor: "pointer",
      fontSize: 13,
      ...theme.textSelect?.option,
      ...(focused ? theme.textSelect?.optionFocused : undefined),
    }}
    title={option.description}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect();
    }}
    onMouseEnter={onFocus}
  >
    {option.name}
    {option.hotkey?.length && (
      <span style={{ float: "right", marginTop: -1 }}>
        {option.hotkey.map((key) => (
          <span
            style={{
              borderRadius: 2,
              display: "inline-block",
              marginLeft: 3,
              padding: "1px 4px",
              width: 11,
              fontSize: 11,
              textAlign: "center",
              ...theme.textSelect?.optionHotkey,
              ...(focused ? theme.textSelect?.optionHotkeyFocused : undefined),
            }}
          >
            {key
              .replace(/^(Key|Digit)/, "")
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
  type?: HTMLInputTypeAttribute;
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
      type,
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
            focusedOption === 0 ? options.length - 1 : focusedOption - 1
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
          position: "absolute",
          top: 0,
          transform: "translateX(-50%)",
          width: 450,
          zIndex: 1,
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
            margin: "6px 6px 2px",
            padding: 4,
            width: "calc(100% - 22px)",
            ...theme.input,
          }}
          type={type}
          value={value}
        />
        {options.map((option, index) => (
          <TextSelectOption
            focused={focusedOption === index}
            onSelect={() => onSelect(index)}
            option={option}
            onFocus={() => onFocusOption(index)}
          />
        ))}
      </div>
    );
  }
);
