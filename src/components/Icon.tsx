import { React } from "../deps.ts";

export type IconType =
  | "database"
  | "data_sheet"
  | "grid"
  | "support"
  | "flash_on"
  | "tree_structure"
  | "add_database"
  | "data_configuration"
  | "pie_chart"
  | "document";

export const Icon = ({
  icon,
  size = 16,
  style,
}: {
  icon: IconType;
  size?: 16;
  style?: React.CSSProperties;
}) => (
  <img
    src={`https://raw.githubusercontent.com/icons8/flat-color-icons/8eccbbbd8b2af1d2c9593e7cfba5ecb0d68ee378/svg/${icon}.svg`}
    width={size}
    style={style}
  />
);
