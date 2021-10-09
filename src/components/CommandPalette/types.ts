import { BadgeColor } from "../vel/Badge.tsx";

export type Command = {
  callback: () => void;
  description?: string;
  hidden?: boolean;
  hotkey?: string[];
  id: string;
  name: string;
  tags?: { label: string; color: BadgeColor }[];
};
