import { Label } from "../components/Label.tsx";
import { Log } from "../components/Log.tsx";
import { Panel } from "../components/Panel.tsx";
import { QueryTab } from "../components/QueryTab.tsx";
import { TableDataTab } from "../components/TableDataTab.tsx";
import { TableTab } from "../components/TableTab/TableTab.tsx";
import { Tabs } from "../components/Tabs.tsx";
import { LogContext } from "../contexts/LogContext.ts";
import { Connection, QueryContext } from "../contexts/QueryContext.ts";
import { React } from "../deps.ts";
import { Nav } from "./Nav.tsx";
import { Output } from "./Output.tsx";

const getQueryCount = () => {
  const queryCount = parseInt(localStorage.getItem("query-count") ?? "0");
  if (queryCount === 0) {
    localStorage.setItem("query-count", "1");
    localStorage.setItem("query-0", "SELECT 1+1;");
    return 1;
  }
  return queryCount;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [log, setLog] = React.useState<
    { node: React.ReactNode; key: string }[]
  >([]);
  const append = React.useCallback((value: React.ReactNode) => {
    setLog((log) => [
      { node: <Log log={value} />, key: Math.random().toString() },
      ...log.slice(0, 99),
    ]);
  }, []);

  const [connections, setConnections] = React.useState(() => {
    const json = JSON.parse(
      localStorage.getItem("connections") ?? '[{"driver":"mysql","port":3307}]'
    );
    return json as Connection[];
  });

  const [selected, setSelected] = React.useState<Connection | undefined>(
    connections[0]
  );

  const [database, setDatabase] = React.useState<string | undefined>();

  const [table, setTable] = React.useState<string | undefined>();

  return (
    <LogContext.Provider value={{ log, append }}>
      <QueryContext.Provider
        value={{
          connections,
          selected,
          database,
          table,
          patchState: (state) => {
            if (state.connections) setConnections(state.connections);
            if ("selected" in state) setSelected(state.selected);
            if ("database" in state) setDatabase(state.database);
            if ("table" in state) setTable(state.table);
          },
        }}
      >
        {children}
      </QueryContext.Provider>
    </LogContext.Provider>
  );
};

export const MainTabs = () => {
  const [tabCount, setTabCount] = React.useState(getQueryCount());
  const { database, table } = React.useContext(QueryContext);

  return (
    <Tabs
      onNewTab={() => {
        setTabCount((count) => {
          localStorage.setItem("query-count", (count + 1).toString());
          return count + 1;
        });
      }}
      onCloseTab={(index) => {
        setTabCount((count) => {
          let newCount = count - 1;

          for (let i = index; i < newCount; i++) {
            localStorage.setItem(
              `query-${i}`,
              localStorage.getItem(`query-${i + 1}`) ?? ""
            );
          }
          localStorage.removeItem(`query-${newCount}`);

          if (newCount === 0) {
            localStorage.setItem(`query-0`, "");
            newCount++;
          }

          localStorage.setItem("query-count", newCount.toString());

          return newCount;
        });
      }}
    >
      {database && table && (
        <TableTab
          key={table}
          label={<Label icon="data_sheet">{table}</Label>}
          canClose={false}
        />
      )}
      {database && table && (
        <TableDataTab
          key={table}
          label={<Label icon="data_sheet">Data</Label>}
          canClose={false}
        />
      )}
      {Array(tabCount)
        .fill(0)
        .map((_, i) => (
          <QueryTab
            key={`${tabCount}-${i}`}
            id={i}
            label={<Label icon="document">{`Query #${i + 1}`}</Label>}
          />
        ))}
    </Tabs>
  );
};

export const App = () => (
  <Providers>
    <Panel direction="vertical" style={{ height: "100%" }}>
      <Panel id="main" basis="calc(100% - 118px)">
        <Panel id="nav" basis={100} direction="horizontal">
          <Nav />
        </Panel>
        <Panel id="content" basis={800} direction="vertical">
          <MainTabs />
        </Panel>
      </Panel>
      <Panel id="output" basis={100}>
        <Output />
      </Panel>
    </Panel>
  </Providers>
);
