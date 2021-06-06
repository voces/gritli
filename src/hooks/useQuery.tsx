import { Results } from "../components/QueryResults.tsx";
import { LogContext } from "../contexts/LogContext.ts";
import { Connection, QueryContext } from "../contexts/QueryContext.ts";
import { React } from "../deps.ts";

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toPrecision(3)}s`;
  return `${(ms / 60000).toPrecision(3)}m`;
};

export const useQuery = (
  connection?: Connection
): ((
  query: string,
  cache?: "no-cache" | "force-cache"
) => Promise<Results>) => {
  const queryContext = React.useContext(QueryContext);
  const log = React.useContext(LogContext);
  const usedConnection = connection ?? queryContext.selected;

  if (usedConnection)
    return async (query, cache = "no-cache") => {
      log.append(query);

      const start = Date.now();

      const results: Results = await fetch(
        `http://localhost:3000/?config=${encodeURIComponent(
          JSON.stringify(usedConnection)
        )}&query=${encodeURIComponent(query)}`,
        { cache: cache }
      ).then((r) => r.json());

      const totalDuration = Date.now() - start;

      if (results.error)
        log.append(
          <span style={{ color: "red" }}>
            {"-- "}
            {results.error}
          </span>
        );

      if (results.rows)
        log.append(
          <span style={{ color: "#666" }}>
            -- completed with {results.rows.length} results in{" "}
            {formatDuration(totalDuration)} ({formatDuration(results.duration)}{" "}
            query time)
          </span>
        );

      return results;
    };

  return (query: string) => {
    console.warn("No connection for query", query);
    return Promise.resolve({ duration: 0, error: "No connection selected" });
  };
};
