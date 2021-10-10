import React from "react";
import { theme } from "../../theme.ts";

export type BadgeColor = "red" | "green";

export const Badge = ({
  children,
  color,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
  color: BadgeColor;
}) => (
  <span
    {...props}
    style={{
      padding: "1px 4px",
      borderRadius: 4,
      ...theme.badge?.[color],
      ...props.style,
    }}
  >
    {children}
  </span>
);
