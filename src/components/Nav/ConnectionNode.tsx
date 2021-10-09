import { Connection, connectionSlice } from "../../features/connectionSlice.ts";
import { useQuery } from "../../hooks/useQuery.tsx";
import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { TreeNode } from "./TreeNode.tsx";
import { formatConnection } from "../../helpers/formatConnection.ts";
import { DatabaseNode } from "./DatabaseNode.tsx";

export const ConnectionNode = ({
  connection,
  selected,
}: {
  connection: Connection;
  selected: boolean;
}) => {
  const query = useQuery(connection);
  const [databases, setDatabases] = useState<string[]>();
  const { database: selectedDatabase } = useAppSelector(
    (state) => state.connection
  );
  const dispatch = useAppDispatch();

  const retrieveDatabases = useCallback(() => {
    query("SHOW DATABASES;").then((result) => {
      if (result.rows) {
        const newDatabases = result.rows.map((r) =>
          (r.Database ?? "").toString()
        );
        setDatabases(newDatabases);
        if (!selectedDatabase)
          dispatch(
            connectionSlice.actions.selectDatabase({
              database: newDatabases[0],
            })
          );
      }
    });
  }, []);

  useEffect(() => {
    if (selected && !databases) retrieveDatabases();
  }, [selected, databases]);

  return (
    <TreeNode
      label={
        <span style={{ fontWeight: selected ? "bold" : "inherit" }}>
          {formatConnection(connection)}
        </span>
      }
      onClick={() => {
        if (!selected) {
          dispatch(connectionSlice.actions.selectConnection({ connection }));
          return false;
        }
        return true;
      }}
      onExpand={retrieveDatabases}
      nodes={databases?.map((d) => (
        <DatabaseNode connection={connection} database={d} />
      ))}
      showGuides={false}
      initialExpanded={selected}
    />
  );
};
