import { React } from "../deps.ts";
import { useQuery } from "../hooks/useQuery.tsx";
import { QueryResults, Results } from "./QueryResults.tsx";
import { QueryContext } from "../contexts/QueryContext.ts";

export const TableDataTab = ({}: {
  label: React.ReactNode;
  canClose: boolean;
}) => {
  const { database, table } = React.useContext(QueryContext);
  const [results, setResults] = React.useState<Results | undefined>();
  const query = useQuery();

  React.useEffect(() => {
    if (table)
      query(`SELECT * FROM \`${database}\`.\`${table}\` LIMIT 1000;`).then(
        setResults
      );
  }, [table]);

  return results ? <QueryResults results={results} /> : null;
};
