import { React } from "../../deps.ts";
import { Icon, IconType } from "./Icon.tsx";

export const Label = ({
  children,
  icon,
  iconStyle,
  style,
}: {
  children: React.ReactNode;
  icon: IconType;
  iconStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}) => (
  <span style={{ display: "inline-flex", alignItems: "center", ...style }}>
    <Icon icon={icon} style={{ paddingRight: 2, ...iconStyle }} />
    {children}
  </span>
);
