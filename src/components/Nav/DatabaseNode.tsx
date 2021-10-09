import { Connection, connectionSlice } from "../../features/connectionSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { useQuery } from "../../hooks/useQuery.tsx";
import React, { useState, useEffect } from "react";
import { TreeNode } from "./TreeNode.tsx";
import { Icon } from "../vel/Icon.tsx";
import { TableNode } from "./TableNode.tsx";

export const DatabaseNode = ({
  database,
  connection,
}: {
  database: string;
  connection: Connection;
}) => {
  const {
    connection: selectedConnection,
    database: selectedDatabase,
    table: selectedTable,
  } = useAppSelector((state) => state.connection);
  const dispatch = useAppDispatch();
  const query = useQuery(connection);
  const [tables, setTables] = useState<string[]>([]);
  const isSelected =
    connection === selectedConnection && database === selectedDatabase;
  const [localSelectedTable, setLocalSelectedTable] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (tables.length || !isSelected) return;

    query(`SHOW TABLE STATUS FROM \`${database}\`;`).then((result) => {
      if (result.rows) {
        setTables(result.rows.map((r) => (r.Name ?? "").toString()));
        const table = result.rows[0]?.Name;
        if (typeof table === "string") {
          setLocalSelectedTable(table);
          dispatch(
            connectionSlice.actions.selectTable({ connection, database, table })
          );
          if (selectedDatabase !== database) query(`USE \`${database}\`;`);
        }
      }
    });
  }, [isSelected, tables.length]);

  return (
    <TreeNode
      initialExpanded={isSelected}
      label={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon icon="database" />
          <span style={{ fontWeight: isSelected ? "bold" : "inherit" }}>
            {database}
          </span>
        </div>
      }
      onClick={(_: React.MouseEvent, expanded: boolean) => {
        if (!isSelected && expanded) {
          dispatch(
            connectionSlice.actions.selectDatabase({
              connection,
              database,
              table: localSelectedTable,
            })
          );
          query(`USE \`${database}\`;`);
          // Don't collapse if just reselecting
          return false;
        }
        return true;
      }}
      onExpand={() => {
        dispatch(
          connectionSlice.actions.selectDatabase({
            connection,
            database,
            table: localSelectedTable,
          })
        );
        query(`USE \`${database}\`;`);
      }}
      nodes={tables.map((table) => (
        <TableNode
          table={table}
          isSelected={isSelected && table === selectedTable}
          onSelect={() => {
            setLocalSelectedTable(table);
            dispatch(
              connectionSlice.actions.selectTable({
                connection,
                database,
                table,
              })
            );
            if (selectedDatabase !== database) query(`USE \`${database}\`;`);
          }}
        />
      ))}
    />
  );
};
