import React from "react";
import { theme } from "../../theme.ts";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    style={{
      width: "13em",
      padding: 2,
      fontSize: "80%",
      ...props.style,
      ...theme.input,
    }}
  />
));
