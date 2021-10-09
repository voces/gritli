import React from "react";
import { theme } from "../../../theme.ts";

export const TextArea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    style={{
      width: "13em",
      resize: "none",
      font: "inherit",
      fontSize: "80%",
      ...props.style,
      ...theme.input,
    }}
  />
);
