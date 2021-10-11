import React from "react";
import { useAppSelector } from "../hooks/storeHooks.ts";
import { Log } from "./Log.tsx";

export const Output = () => {
  let log = useAppSelector((state) => state.output);
  if (log.length > 1000) log = log.slice(0, 1000);

  return (
    <pre style={{ margin: 0 }}>
      {log.map(({ key, time, node }) => (
        <Log key={key} time={time}>
          {node}
        </Log>
      ))}
    </pre>
  );
};
