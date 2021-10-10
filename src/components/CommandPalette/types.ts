export type Command = {
  callback: () => void;
  description?: string;
  hidden?: boolean;
  hotkey?: string[];
  id: string;
  name: string;
};
