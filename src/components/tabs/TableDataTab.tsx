import { useQuery } from "../../hooks/useQuery.tsx";
import { QueryResults, Results } from "../results/QueryResults.tsx";
import React, { useState, useEffect, useContext } from "react";
import { useAppSelector } from "../../hooks/storeHooks.ts";

export const TableDataTab = ({}: {
  label: React.ReactNode;
  canClose: boolean;
}) => {
  const { database, table } = useAppSelector((s) => ({
    database: s.connection.database,
    table: s.connection.table,
  }));
  const [results, setResults] = useState<Results | undefined>();
  const query = useQuery();

  useEffect(() => {
    if (table)
      query(`SELECT * FROM \`${database}\`.\`${table}\` LIMIT 1000;`).then(
        setResults
      );
  }, [table]);

  return results ? <QueryResults results={results} /> : null;
};
