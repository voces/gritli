import { useQuery } from "../../hooks/useQuery.tsx";
import { QueryResults, Results } from "../results/QueryResults.tsx";
import { QueryContext } from "../../contexts/QueryContext.ts";
import { createElement, useState, useEffect, useContext } from "react";

export const TableDataTab = ({}: {
  label: React.ReactNode;
  canClose: boolean;
}) => {
  const { database, table } = useContext(QueryContext);
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
