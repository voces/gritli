import { LogContext } from "../contexts/LogContext.ts";
import React, { useContext } from "react";

export const Output = () => {
  const logContext = useContext(LogContext);

  return (
    <pre style={{ margin: 0 }}>
      {logContext.log.map((l) => (
        <React.Fragment key={l.key}>{l.node}</React.Fragment>
      ))}
    </pre>
  );
};
