import { Log } from "../components/Log.tsx";
import { Panel } from "../components/Panel.tsx";
import { QueryTab } from "../components/QueryTab.tsx";
import { Tabs } from "../components/Tabs.tsx";
import { LogContext } from "../contexts/LogContext.ts";
import { Connection, QueryContext } from "../contexts/QueryContext.ts";
import { React } from "../deps.ts";
import { useLazyRef } from "../hooks/useLazyRef.ts";
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

export const App = () => {
  const [tabCount, setTabCount] = React.useState(getQueryCount());
  const connections = useLazyRef(() => {
    const json = JSON.parse(
      localStorage.getItem("connections") ?? '[{"driver":"mysql","port":3307}]'
    );
    return json as Connection[];
  }).current;
  const [log, setLog] = React.useState<
    { node: React.ReactNode; key: string }[]
  >([]);
  const append = React.useCallback((value: React.ReactNode) => {
    setLog((log) => [
      { node: <Log log={value} />, key: Math.random().toString() },
      ...log.slice(0, 99),
    ]);
  }, []);

  return (
    <LogContext.Provider value={{ log, append }}>
      <QueryContext.Provider
        value={{
          connections: connections,
          selected: connections[0],
        }}
      >
        <Panel direction="vertical" style={{ height: "100%" }}>
          <Panel id="main" basis="calc(100% - 118px)">
            <Panel id="nav" basis={100}>
              <Nav />
            </Panel>
            <Panel id="content" basis={900} direction="vertical">
              <Tabs
                onNewTab={() => {
                  setTabCount((count) => {
                    localStorage.setItem("query-count", (count + 1).toString());
                    return count + 1;
                  });
                }}
                onCloseTab={(index) => {
                  setTabCount((count) => {
                    const newCount = count - 1;

                    for (let i = index; i < newCount; i++)
                      localStorage.setItem(
                        `query-${i}`,
                        localStorage.getItem(`query-${i + 1}`) ?? ""
                      );
                    localStorage.removeItem(`query-${newCount}`);

                    localStorage.setItem("query-count", newCount.toString());

                    return newCount;
                  });
                }}
              >
                {Array(tabCount)
                  .fill(0)
                  .map((_, i) => (
                    <QueryTab
                      key={`${tabCount}-${i}`}
                      id={i}
                      label={`Query #${i + 1}`}
                    />
                  ))}
              </Tabs>
            </Panel>
          </Panel>
          <Panel id="output" basis={100}>
            <Output />
          </Panel>
        </Panel>
      </QueryContext.Provider>
    </LogContext.Provider>
  );
};
