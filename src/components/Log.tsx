import React from "react";
import { useLazyRef } from "../hooks/useLazyRef.ts";

const formatter = new Intl.DateTimeFormat("en-us", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
  hour12: false,
});

export const Log = ({
  children,
  time,
}: {
  children: React.ReactNode;
  time: number;
}) => (
  <div style={{ display: "flex" }}>
    <span style={{ color: "#999", marginRight: 4 }}>
      [{formatter.format(time)}]
    </span>
    {children}
  </div>
);
