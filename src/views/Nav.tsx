import { TreeNode } from "../components/TreeNode.tsx";
import { Connection, QueryContext } from "../contexts/QueryContext.ts";
import { React } from "../deps.ts";
import { useQuery } from "../hooks/useQuery.tsx";
import { theme } from "../theme.ts";

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
    patchState,
  } = React.useContext(QueryContext);
  const query = useQuery(connection);
  const [tables, setTables] = React.useState<string[]>([]);
  const selected =
    connection === selectedConnection && database === selectedDatabase;

  return (
    <TreeNode
      label={
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://raw.githubusercontent.com/icons8/flat-color-icons/master/svg/database.svg"
            width={16}
          ></img>
          <span style={{ fontWeight: selected ? "bold" : "inherit" }}>
            {database}
          </span>
        </div>
      }
      onClick={(_: React.MouseEvent, expanded: boolean) => {
        if (!selected && expanded) {
          patchState({ database });
          query(`USE \`${database}\`;`);
          return false;
        }
        return true;
      }}
      onExpand={() => {
        patchState({ database });
        query(`USE \`${database}\`;`);
        query(`SHOW TABLES FROM \`${database}\`;`).then((result) => {
          if (result.rows) {
            setTables(
              result.rows.map((r) => r[`Tables_in_${database}`].toString())
            );
          }
        });
      }}
      nodes={tables.map((table) => (
        <div key={table} style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://icons8.github.io/flat-color-icons/svg/data_sheet.svg"
            width={16}
          ></img>
          {table}
        </div>
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
  const [databases, setDatabases] = React.useState<string[]>();

  const retrieveDatabases = React.useCallback(() => {
    query("SHOW DATABASES;").then((result) => {
      if (result.rows) {
        setDatabases(result.rows.map((r) => r.Database.toString()));
      }
    });
  }, []);

  React.useEffect(() => {
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
  const { connections, selected, database } = React.useContext(QueryContext);

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
