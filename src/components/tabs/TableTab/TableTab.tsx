import {
  EDITOR_TYPE_BOOLEAN,
  EDITOR_TYPE_REACT,
  MYSQL_TYPE_SHORT,
  MYSQL_TYPE_VARCHAR,
} from "../../../constants.ts";
import { QueryContext } from "../../../contexts/QueryContext.ts";
import { createElement, useState, useEffect, useContext } from "react";
import {
  SqlColumn,
  sqlColumnTransform,
} from "../../../helpers/sqlColumnTransform.ts";
import { useQuery } from "../../../hooks/useQuery.tsx";
import { useSessionState } from "../../../hooks/useSessionState.ts";
import { theme } from "../../../theme.ts";
import { Panel } from "../../panels/Panel.tsx";
import { ResultTable } from "../../results/QueryResults.tsx";
import { Tabs } from "../../Tabs.tsx";
import { BasicData, BasicTab } from "./BasicTab.tsx";
import { Label } from "vel/Label.tsx";
import { OptionsData, OptionsTab } from "./OptionsTab.tsx";
import { CreateCodeTab } from "./CreateCodeTab.tsx";
import { Index, indexRowsToObjs, IndexTab } from "./IndexTab.tsx";
import {
  ForeignKey,
  foreignKeyRowsToObjs,
  ForeignKeyTab,
} from "./ForeignKeyTab.tsx";

const Placeholder = ({}: { label: React.ReactNode }) => <div>Placeholder</div>;

const fields = [
  { name: "#", fieldType: EDITOR_TYPE_REACT },
  { name: "Name", fieldType: MYSQL_TYPE_VARCHAR },
  { name: "Datatype", fieldType: MYSQL_TYPE_VARCHAR },
  { name: "Length/Set", fieldType: MYSQL_TYPE_SHORT },
  { name: "Unsigned", fieldType: EDITOR_TYPE_BOOLEAN },
  { name: "Allow NULL", fieldType: EDITOR_TYPE_BOOLEAN },
  // { name: "Zerofill", fieldType: MYSQL_TYPE_VARCHAR },
  { name: "Default", fieldType: MYSQL_TYPE_VARCHAR },
  { name: "Comment", fieldType: MYSQL_TYPE_VARCHAR },
  { name: "Collation", fieldType: MYSQL_TYPE_VARCHAR },
  // { name: "Expression", fieldType: MYSQL_TYPE_VARCHAR },
  // { name: "Virtuality", fieldType: MYSQL_TYPE_VARCHAR },
];

const KEY: Record<string, string> = {
  PRI: "🔑",
};

const TableTabInner = ({
  database,
  table,
}: {
  database: string;
  table: string;
}) => {
  const selectedTabState = useSessionState("tableTab", 0);
  const query = useQuery();
  const [basicData, setBasicData] = useState<BasicData>({
    name: table,
    comment: "",
  });
  const [optionsData, setOptionsData] = useState<OptionsData>({
    autoIncrement: undefined,
    defaultCollation: "utf8mb4_unicode_ci",
    engine: "InnoDB",
    rowFormat: "DEFAULT",
    checksum: false,
  });
  const [columns, setColumns] = useState<SqlColumn[]>([]);
  const [indexes, setIndexes] = useState<Index[]>([]);
  const [foreignKeys, setForeignKeys] = useState<ForeignKey[]>([]);

  useEffect(() => {
    query(
      // maybe use: SHOW FULL COLUMNS FROM `database`.`table`;
      // `SELECT * FROM \`information_schema\`.\`COLUMNS\` WHERE TABLE_SCHEMA = '${database}' AND TABLE_NAME = '${table}';`
      `SHOW FULL COLUMNS FROM \`${database}\`.\`${table}\``
    ).then((ret) => setColumns(sqlColumnTransform(ret.rows) ?? []));

    query(
      `SELECT * FROM \`information_schema\`.\`TABLES\` WHERE TABLE_SCHEMA = '${database}' AND TABLE_NAME = '${table}';`
    ).then((ret) => {
      const row = ret.rows?.[0];
      if (row) {
        const name = row.TABLE_NAME;
        const comment = row.TABLE_COMMENT;

        setBasicData({
          name: typeof name === "string" ? name : basicData.name,
          comment: typeof comment === "string" ? comment : basicData.comment,
        });

        const autoIncrement = row.AUTO_INCREMENT;
        const defaultCollation = row.TABLE_COLLATION;
        const engine = row.ENGINE;
        const rowFormat = row.ROW_FORMAT;
        const checksum = row.CHECKSUM;

        setOptionsData({
          autoIncrement:
            typeof autoIncrement === "number"
              ? autoIncrement
              : optionsData.autoIncrement,
          defaultCollation:
            typeof defaultCollation === "string"
              ? defaultCollation
              : optionsData.defaultCollation,
          engine: typeof engine === "string" ? engine : optionsData.engine,
          rowFormat:
            typeof rowFormat === "string" ? rowFormat : optionsData.rowFormat,
          checksum:
            typeof checksum === "boolean" ? checksum : optionsData.checksum,
        });
      }

      query(`SHOW INDEXES IN \`${database}\`.\`${table}\`;`).then((ret) => {
        setIndexes(indexRowsToObjs(ret.rows));
      });

      query(`SELECT
    tc.constraint_name,
    kcu.column_name, kcu.referenced_table_name, kcu.referenced_column_name,
    rc.update_rule, rc.delete_rule
FROM information_schema.table_constraints tc
INNER JOIN information_schema.key_column_usage kcu ON
    tc.constraint_catalog = kcu.constraint_catalog
    AND tc.constraint_schema = kcu.constraint_schema
    AND tc.constraint_name = kcu.constraint_name
    AND tc.table_name = kcu.table_name
LEFT JOIN information_schema.referential_constraints rc ON
    tc.constraint_catalog = rc.constraint_catalog
    AND tc.constraint_schema = rc.constraint_schema
    AND tc.constraint_name = rc.constraint_name
    AND tc.table_name = rc.table_name
WHERE
    tc.constraint_type = 'FOREIGN KEY'
    AND tc.constraint_schema = '${database}'
    AND tc.table_name = '${table}';`).then((ret) => {
        setForeignKeys(foreignKeyRowsToObjs(ret.rows));
      });
    });
  }, [database, table]);

  return (
    <Panel direction="vertical" style={{ height: "100%" }}>
      <Panel id="table-metadata">
        <Tabs selectedTabState={selectedTabState} style={{ height: "100%" }}>
          <BasicTab
            label={<Label icon="grid">Basic</Label>}
            data={basicData}
            onChange={(newValue) => setBasicData({ ...basicData, ...newValue })}
          />
          <OptionsTab
            label={<Label icon="support">Options</Label>}
            data={optionsData}
          />
          <IndexTab
            label={<Label icon="flash_on">Indexes</Label>}
            indexes={indexes}
          />
          <ForeignKeyTab
            label={<Label icon="tree_structure">Foreign keys</Label>}
            foreignKeys={foreignKeys}
          />
          <Placeholder label={<Label icon="pie_chart">Partitions</Label>} />
          <CreateCodeTab
            label={<Label icon="add_database">CREATE code</Label>}
            table={table}
          />
          <Placeholder
            label={<Label icon="data_configuration">ALTER code</Label>}
          />
        </Tabs>
      </Panel>
      <Panel id="table-columns" direction="vertical">
        <div>
          <div style={{ margin: "0.125em 0.25em 0.25em" }}>Columns</div>
          <div
            style={{
              ...theme.table.cell,
              borderBottom: undefined,
              borderLeft: undefined,
              borderRight: undefined,
            }}
          >
            <ResultTable
              fields={fields}
              rows={columns.map((column, idx) => ({
                "#": (
                  <div style={{ textAlign: "right" }}>
                    {column.key ? <Label icon="key">{idx + 1}</Label> : idx + 1}
                  </div>
                ),
                Name: column.name,
                Datatype: column.dataType,
                "Length/Set": column.dataLength,
                Unsigned: column.unsigned,
                "Allow NULL": column.nullable,
                Default: column.default,
                Comment: column.comment,
                Collation: column.collation,
              }))}
            />
          </div>
        </div>
      </Panel>
    </Panel>
  );
};

export const TableTab = ({}: { label: React.ReactNode; canClose: boolean }) => {
  const { database, table } = useContext(QueryContext);
  if (!database || !table) return null;
  return <TableTabInner database={database} table={table} />;
};
