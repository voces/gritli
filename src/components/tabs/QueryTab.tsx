import MonacoEditor from "monaco";
import React, { useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery.tsx";
import { Panel } from "../Panels/Panel.tsx";
import { QueryResults, Results } from "../results/QueryResults.tsx";
import { ErrorBoundary } from "../ErrorBoundary.tsx";
import { theme } from "../../theme.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { tabsSlice } from "../../features/tabsSlice.ts";

export const QueryTab = ({
  id,
}: {
  id: number;
  label: React.ReactNode;
  canClose?: boolean;
}) => {
  const [results, setResults] = useState<Results | undefined>();
  const query = useAppSelector((s) => s.tabs.queryTabs[id]);
  const dispatch = useAppDispatch();
  const queryFn = useQuery();

  useEffect(() => {
    if (!query) return;
    queryFn(query, "force-cache").then(setResults);
  }, []);

  useEffect(() => {
    const listener = async (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        setResults(await queryFn(query));
      }
    };
    globalThis.addEventListener("keydown", listener);

    return () => globalThis.removeEventListener("keydown", listener);
  }, [query]);

  return (
    <Panel direction="vertical" style={{ height: "100%" }}>
      <Panel id="query" basis={"40%"}>
        <div
          style={{
            overflow: "hidden",
            height: "calc(100% - 1px)",
            width: "100%",
          }}
        >
          <ErrorBoundary>
            <MonacoEditor
              defaultLanguage="sql"
              value={query}
              onChange={(v: string) => {
                localStorage.setItem(`query-${id}`, v);
                dispatch(tabsSlice.actions.updateTab({ id, value: v }));
              }}
              options={{ minimap: { enabled: false } }}
              loading={null}
              theme={theme.monaco}
            />
          </ErrorBoundary>
        </div>
      </Panel>
      <Panel id="results" basis={"60%"} style={{ overflow: "auto" }}>
        {results && <QueryResults results={results} />}
      </Panel>
    </Panel>
  );
};
