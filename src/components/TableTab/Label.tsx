import { React } from "../../deps.ts";
import { Icon, IconType } from "./../Icon.tsx";

export const Label = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: IconType;
}) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Icon icon={icon} style={{ paddingRight: 2 }} />
    {children}
  </div>
);
