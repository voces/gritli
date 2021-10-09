import { Results } from "../components/results/QueryResults.tsx";
import { Connection, QueryContext } from "../contexts/QueryContext.ts";
import React, { useContext, useState } from "react";
import { useAppDispatch } from "./storeHooks.ts";
import { outputSlice } from "../features/outputSlice.ts";

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toPrecision(3)}s`;
  return `${(ms / 60000).toPrecision(3)}m`;
};

export const useQuery = (
  connection?: Connection
): ((query: string, cache?: RequestCache) => Promise<Results>) => {
  const queryContext = useContext(QueryContext);
  const [lastResults, setLastResults] = useState<Results | Error>();
  const usedConnection = connection ?? queryContext.selected;
  const dispatch = useAppDispatch();

  if (usedConnection)
    return async (query, cache = "no-cache") => {
      dispatch(outputSlice.actions.append(query));

      const start = Date.now();

      const results: Results | Error = await fetch(
        `http://localhost:3000/?config=${encodeURIComponent(
          JSON.stringify(usedConnection)
        )}&query=${encodeURIComponent(query)}`,
        {
          cache:
            !lastResults || lastResults instanceof Error || lastResults.error
              ? "reload"
              : cache,
        }
      )
        .then((r) => r.json())
        .catch((err) => err);

      setLastResults(results);

      if (results instanceof Error) {
        if (results.message === "Failed to fetch") {
          results.message = "Unable to connect to proxy service.";
        }
        dispatch(
          outputSlice.actions.append(
            <span style={{ color: "red" }}>
              {"-- "}
              {results.message}
            </span>
          )
        );
        throw results;
      }

      const totalDuration = Date.now() - start;

      if (results.error)
        dispatch(
          outputSlice.actions.append(
            <span style={{ color: "red" }}>
              {"-- "}
              {results.error}
            </span>
          )
        );

      if (results.rows)
        dispatch(
          outputSlice.actions.append(
            <span style={{ color: "#666" }}>
              {`-- completed with ${
                results.rows.length
              } results in ${formatDuration(totalDuration)} (${formatDuration(
                results.duration
              )} query time)`}
            </span>
          )
        );

      return results;
    };

  return (query: string) => {
    console.warn("No connection for query", query);
    return Promise.resolve({ duration: 0, error: "No connection selected" });
  };
};
