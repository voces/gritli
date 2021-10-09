import React from "react";
import { useAppSelector } from "../hooks/storeHooks.ts";
import { Log } from "./Log.tsx";

export const Output = () => {
  const log = useAppSelector((state) => state.output);

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
