import { format } from "sql-formatter";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "../../../hooks/useQuery.tsx";
import { TextArea } from "./TextArea.tsx";
import { useAppSelector } from "../../../hooks/storeHooks.ts";

export const CreateCodeTab = ({
  table,
}: {
  label: React.ReactNode;
  table: string;
}) => {
  const database = useAppSelector((s) => s.connection.database);
  const query = useQuery();
  const [code, setCode] = useState("");

  useEffect(() => {
    // Derive from all data rather than just using existing create code...
    query(`SHOW CREATE TABLE \`${database}\`.\`${table}\`;`).then((ret) => {
      const firstRow = ret.rows?.[0];
      const code = firstRow?.["Create Table"] ?? firstRow?.["Create View"];
      const isView = firstRow && "Create View" in firstRow;
      if (typeof code === "string") {
        setCode(isView ? format(code, { language: "mysql" }) : code);
      }
    });
  }, [table]);

  return (
    <TextArea value={code} style={{ width: "100%", height: "100%" }} readOnly />
  );
};
