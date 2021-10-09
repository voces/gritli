import { Label } from "vel/Label.tsx";
import { Panel } from "./Panels/Panel.tsx";
import { QueryTab } from "./tabs/QueryTab.tsx";
import { TableDataTab } from "./tabs/TableDataTab.tsx";
import { TableTab } from "./tabs/TableTab/TableTab.tsx";
import { Tabs } from "./Tabs.tsx";
import React, { useState } from "react";
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

export const MainTabs = () => {
  const [tabCount, setTabCount] = useState(getQueryCount());
  const { database, table } = useAppSelector((s) => ({
    database: s.connection.database,
    table: s.connection.table,
  }));

  const foo = 1 + Math.random();
  if (foo > 2) return null;

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
  </Provider>
);
