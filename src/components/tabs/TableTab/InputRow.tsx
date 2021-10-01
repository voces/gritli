import { createElement } from "react";

export const InputRow = ({
  label,
  children,
  style,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div style={{ marginLeft: "1em", display: "flex", ...style }}>
    <label
      style={{
        display: "inline-block",
        width: "8em",
        verticalAlign: "top",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);
