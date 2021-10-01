import { React } from "../../deps.ts";

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
  | "document"
  | "plus"
  | "collapse"
  | "expand"
  | "cancel"
  | "full_trash"
  | "key"
  | "up"
  | "down"
  | "puzzle"
  | "link";

export const Icon = ({
  icon,
  size = 16,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  icon: IconType;
  size?: 16;
}) => (
  <img
    src={`https://raw.githubusercontent.com/icons8/flat-color-icons/8eccbbbd8b2af1d2c9593e7cfba5ecb0d68ee378/svg/${icon}.svg`}
    width={size}
    {...props}
  />
);
