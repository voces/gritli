import MonacoEditor from "monaco";
import { createElement, useState, useEffect } from "react";
import { useQuery } from "../../hooks/useQuery.tsx";
import { Panel } from "../panels/Panel.tsx";
import { QueryResults, Results } from "../results/QueryResults.tsx";
import { ErrorBoundary } from "../ErrorBoundary.tsx";
import { theme } from "../../theme.ts";

export const QueryTab = ({ id }: { id: number; label: React.ReactNode }) => {
  const [query, setQuery] = useState(localStorage.getItem(`query-${id}`) ?? "");
  const [results, setResults] = useState<Results | undefined>();

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
                setQuery(v);
              }}
              // onDidChangeCursorSelection={e => {
              // }}
              // onMount={(e: { focus: () => void }, next: any) => {
              //   e.focus();
              //   (window as any).editor = e;
              // }}
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
