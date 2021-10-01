import { Icon } from "vel/Icon.tsx";
import { TreeNode } from "./TreeNode.tsx";
import { Connection, QueryContext } from "../../contexts/QueryContext.ts";
import {
  createElement,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useQuery } from "../../hooks/useQuery.tsx";
import { theme } from "../../theme.ts";

const Database = ({
  database,
  connection,
}: {
  database: string;
  connection: Connection;
}) => {
  const {
    selected: selectedConnection,
    database: selectedDatabase,
    table: selectedTable,
    patchState,
  } = useContext(QueryContext);
  const query = useQuery(connection);
  const [tables, setTables] = useState<string[]>([]);
  const selected =
    connection === selectedConnection && database === selectedDatabase;
  const [localSelectedTable, setLocalSelectedTable] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (tables.length || !selected) return;

    query(`SHOW TABLE STATUS FROM \`${database}\`;`).then((result) => {
      if (result.rows) {
        setTables(result.rows.map((r) => (r.Name ?? "").toString()));
        const table = result.rows[0]?.Name;
        if (typeof table === "string") {
          setLocalSelectedTable(table);
          patchState({ database, table });
        }
      }
    });
  }, [selected, tables.length]);

  return (
    <TreeNode
      initialExpanded={selected}
      label={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon icon="database" />
          <span style={{ fontWeight: selected ? "bold" : "inherit" }}>
            {database}
          </span>
        </div>
      }
      onClick={(_: React.MouseEvent, expanded: boolean) => {
        if (!selected && expanded) {
          patchState({ database, table: localSelectedTable });
          query(`USE \`${database}\`;`);
          // Don't collapse if just reselecting
          return false;
        }
        return true;
      }}
      onExpand={() => {
        patchState({ database, table: localSelectedTable });
        query(`USE \`${database}\`;`);
      }}
      nodes={tables.map((table) => (
        <TreeNode
          key={table}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon icon="data_sheet" />
              <span
                style={{
                  fontWeight:
                    selected && table === selectedTable ? "bold" : "inherit",
                }}
              >
                {table}
              </span>
            </div>
          }
          onClick={() => {
            if (selectedTable !== table) {
              setLocalSelectedTable(table);
              patchState({ database, table });
              return false;
            }
            return true;
          }}
        />
      ))}
    />
  );
};

const ConnectionComponent = ({
  connection,
  selected,
}: {
  connection: Connection;
  selected: boolean;
}) => {
  const query = useQuery(connection);
  const [databases, setDatabases] = useState<string[]>();
  const { database: selectedDatabase, patchState } = useContext(QueryContext);

  const retrieveDatabases = useCallback(() => {
    query("SHOW DATABASES;").then((result) => {
      if (result.rows) {
        const newDatabases = result.rows.map((r) =>
          (r.Database ?? "").toString()
        );
        setDatabases(newDatabases);
        if (!selectedDatabase) patchState({ database: newDatabases[0] });
      }
    });
  }, []);

  useEffect(() => {
    if (selected && !databases) retrieveDatabases();
  }, [selected, databases]);

  return (
    <TreeNode
      label={
        <span style={{ fontWeight: "bold" }}>
          {connection.username ?? "root"}@{connection.hostname ?? "localhost"}:
          {connection.port ?? 3306}
        </span>
      }
      onExpand={retrieveDatabases}
      nodes={databases?.map((d) => (
        <Database connection={connection} database={d} />
      ))}
      showGuides={false}
      initialExpanded={selected}
    />
  );
};

export const Nav = () => {
  const { connections, selected, database } = useContext(QueryContext);

  return (
    <nav
      style={{
        padding: "2px 4px",
        width: "100%",
        overflow: "auto",
        fontSize: 14,
        ...theme.nav.container,
      }}
    >
      {connections.map((c) => (
        <ConnectionComponent
          key={JSON.stringify(c)}
          connection={c}
          selected={c === selected}
        />
      ))}
    </nav>
  );
};
