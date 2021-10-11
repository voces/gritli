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
import { store } from "../store/store.ts";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks.ts";
import { tabsSlice } from "../store/slices/tabsSlice.ts";

// const getQueryCount = () => {
//   const queryCount = parseInt(localStorage.getItem("query-count") ?? "0");
//   if (queryCount === 0) {
//     localStorage.setItem("query-count", "1");
//     localStorage.setItem("query-0", "SELECT 1+1;");
//     return 1;
//   }
//   return queryCount;
// };

const EmptyTab = () => <></>;

export const MainTabs = () => {
  const dispatch = useAppDispatch();
  const { database, table, queryTabCount, selected } = useAppSelector((s) => ({
    database: s.connection.database,
    table: s.connection.table,
    queryTabCount: s.tabs.queryTabCount,
    selected: s.tabs.selected,
  }));

  return (
    <Tabs
      onNewTab={() => {
        dispatch(tabsSlice.actions.newTab());
      }}
      onCloseTab={(index) => {
        dispatch(tabsSlice.actions.closeTab(index));
      }}
      selectedTabState={[
        selected,
        (tab: number | ((selected: number) => number)) => {
          dispatch(
            tabsSlice.actions.selectTab(
              typeof tab === "number" ? tab : tab(selected)
            )
          );
        },
      ]}
    >
      {database && table ? (
        <TableTab
          key={table}
          label={<Label icon="data_sheet">{table}</Label>}
          canClose={false}
        />
      ) : (
        <EmptyTab />
      )}
      {database && table ? (
        <TableDataTab
          key={table}
          label={<Label icon="data_sheet">Data</Label>}
          canClose={false}
        />
      ) : (
        <EmptyTab />
      )}
      {Array(queryTabCount)
        .fill(0)
        .map((_, i) => (
          <QueryTab
            key={`${queryTabCount}-${i}`}
            id={i}
            label={<Label icon="document">{`Query #${i + 1}`}</Label>}
            canClose={queryTabCount > 1}
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
