import { React } from "../deps.ts";
import { useQuery } from "../hooks/useQuery.tsx";
import { QueryResults, Results } from "./QueryResults.tsx";
import { QueryContext } from "../contexts/QueryContext.ts";

export const TableDataTab = ({
  table,
}: {
  table: string;
  label: React.ReactNode;
  canClose: boolean;
}) => {
  const { database } = React.useContext(QueryContext);
  const [results, setResults] = React.useState<Results | undefined>();
  const query = useQuery();

  React.useEffect(() => {
    query(`SELECT * FROM \`${database}\`.\`${table}\` LIMIT 1000;`).then(
      setResults
    );
  }, [table]);

  return results ? <QueryResults results={results} /> : null;
};
