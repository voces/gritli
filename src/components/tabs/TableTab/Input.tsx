import { React } from "../../../deps.ts";
import { theme } from "../../../theme.ts";

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    style={{
      width: "13em",
      padding: 2,
      fontSize: "80%",
      ...props.style,
      ...theme.input,
    }}
  />
);
