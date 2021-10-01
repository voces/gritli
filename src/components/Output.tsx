import { LogContext } from "../contexts/LogContext.ts";
import { React } from "../deps.ts";

export const Output = () => {
  const logContext = React.useContext(LogContext);

  return (
    <pre style={{ margin: 0 }}>
      {logContext.log.map((l) => (
        <React.Fragment key={l.key}>{l.node}</React.Fragment>
      ))}
    </pre>
  );
};
