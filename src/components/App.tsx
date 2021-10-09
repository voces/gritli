import { Label } from "vel/Label.tsx";
import { Log } from "./Log.tsx";
import { Panel } from "./panels/Panel.tsx";
import { QueryTab } from "./tabs/QueryTab.tsx";
import { TableDataTab } from "./tabs/TableDataTab.tsx";
import { TableTab } from "./tabs/TableTab/TableTab.tsx";
import { Tabs } from "./Tabs.tsx";
import { LogContext } from "../contexts/LogContext.ts";
import { Connection, QueryContext } from "../contexts/QueryContext.ts";
import React, { useState, useContext, useCallback } from "react";
import { Nav } from "./Nav/Nav.tsx";
import { Output } from "./Output.tsx";
import { CommandPalette } from "./CommandPalette/CommandPalette.tsx";
import { store } from "../store.ts";
import { Provider } from "react-redux";
import { useAppSelector } from "../hooks/storeHooks.ts";

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
  const [log, setLog] = useState<{ node: React.ReactNode; key: string }[]>([]);
  const append = useCallback((value: React.ReactNode) => {
    setLog((log) => [
      { node: <Log log={value} />, key: Math.random().toString() },
      ...log.slice(0, 99),
    ]);
  }, []);
  const connections = useAppSelector((s) => s.connections);

  const [selected, setSelected] = useState<Connection | undefined>(
    connections[0]
  );

  const [database, setDatabase] = useState<string | undefined>();

  const [table, setTable] = useState<string | undefined>();

  return (
    <LogContext.Provider value={{ log, append }}>
      <QueryContext.Provider
        value={{
          connections,
          selected,
          database,
          table,
          patchState: (state) => {
            // if (state.connections) setConnections(state.connections);
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
  const [tabCount, setTabCount] = useState(getQueryCount());
  const { database, table } = useContext(QueryContext);

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
  // Store provider set first, since it's used by other providers
  <Provider store={store}>
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
      <CommandPalette />
    </Providers>
  </Provider>
);
