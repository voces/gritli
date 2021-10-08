import { BadgeColor } from "../vel/Badge.tsx";

export type Command = {
  id: string;
  name: string;
  description?: string;
  callback: () => void;
  hotkey?: string[];
  tags?: { label: string; color: BadgeColor }[];
};
