import { createElement } from "react";
import { useLazyRef } from "../hooks/useLazyRef.ts";

const formatter = new Intl.DateTimeFormat("en-us", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
  hour12: false,
});

export const Log = ({ log }: { log: React.ReactNode }) => {
  const time = useLazyRef(() => formatter.format(new Date())).current;
  return (
    <div style={{ display: "flex" }}>
      <span style={{ color: "#999", marginRight: 4 }}>[{time}]</span>
      {log}
    </div>
  );
};
