import { LogContext } from "../contexts/LogContext.ts";
import { createElement, Fragment, useContext } from "react";

export const Output = () => {
  const logContext = useContext(LogContext);

  return (
    <pre style={{ margin: 0 }}>
      {logContext.log.map((l) => (
        <Fragment key={l.key}>{l.node}</Fragment>
      ))}
    </pre>
  );
};
