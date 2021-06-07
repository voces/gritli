import { MonacoEditor, React } from "../deps.ts";
import { useQuery } from "../hooks/useQuery.tsx";
import { Panel } from "./Panel.tsx";
import { QueryResults, Results } from "./QueryResults.tsx";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { theme } from "../theme.ts";

export const QueryTab = ({ id }: { id: number; label: React.ReactNode }) => {
  const [query, setQuery] = React.useState(
    localStorage.getItem(`query-${id}`) ?? "",
  );
  const [results, setResults] = React.useState<Results | undefined>();

  const queryFn = useQuery();

  React.useEffect(() => {
    if (!query) return;
    queryFn(query, "force-cache").then(setResults);
  }, []);

  React.useEffect(() => {
    const listener = async (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        setResults(await queryFn(query));
      }
    };
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [query]);

  return (
    <Panel direction="vertical" style={{ height: "100%" }}>
      <Panel id="query" basis={1}>
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
      <Panel id="results" basis={2} style={{ overflow: "auto" }}>
        {results && <QueryResults results={results} />}
      </Panel>
    </Panel>
  );
};
