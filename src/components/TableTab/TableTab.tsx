import {
  EDITOR_TYPE_BOOLEAN,
  MYSQL_TYPE_SHORT,
  MYSQL_TYPE_VARCHAR,
} from "../../constants.ts";
import { QueryContext } from "../../contexts/QueryContext.ts";
import { React } from "../../deps.ts";
import {
  SqlColumn,
  sqlColumnTransform,
} from "../../helpers/sqlColumnTransform.ts";
import { useQuery } from "../../hooks/useQuery.tsx";
import { useSessionState } from "../../hooks/useSessionState.ts";
import { theme } from "../../theme.ts";
import { Panel } from "./../Panel.tsx";
import { QueryResults } from "./../QueryResults.tsx";
import { Tabs } from "./../Tabs.tsx";
import { BasicData, BasicTab } from "./BasicTab.tsx";
import { Label } from "./Label.tsx";
import { OptionsData, OptionsTab } from "./OptionsTab.tsx";
import { CreateCodeTab } from "./CreateCodeTab.tsx";

const Placeholder = ({}: { label: React.ReactNode }) => <div>Placeholder</div>;

const fields = [
  { name: "#", fieldType: MYSQL_TYPE_SHORT },
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

export const TableTab = ({ label: table }: { label: string }) => {
  const { database } = React.useContext(QueryContext);
  const selectedTabState = useSessionState("tableTab", 0);
  const query = useQuery();
  const [basicData, setBasicData] = React.useState<BasicData>({
    name: table,
    description: "",
  });
  const [optionsData, setOptionsData] = React.useState<OptionsData>({
    autoIncrement: undefined,
    defaultCollation: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  });
  const [columns, setColumns] = React.useState<SqlColumn[]>([]);

  React.useEffect(() => {
    query(
      `SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '${database}' AND TABLE_NAME = '${table}';`
    ).then((ret) => {
      const columns = sqlColumnTransform(ret.rows) ?? [];
      console.log(ret, columns);
      setColumns(columns);
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
          <Placeholder label={<Label icon="flash_on">Indexes</Label>} />
          <Placeholder
            label={<Label icon="tree_structure">Foreign keys</Label>}
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
            <QueryResults
              results={{
                duration: 0,
                fields,
                rows: columns.map((column) => ({
                  "#": column.ordinalPosition,
                  Name: column.name,
                  Datatype: column.dataType,
                  "Length/Set": column.dataLength,
                  Unsigned: column.unsigned,
                  "Allow NULL": column.nullable,
                  Default: column.default,
                  Comment: column.comment,
                  Collation: column.collation,
                })),
              }}
            />
          </div>
        </div>
      </Panel>
    </Panel>
  );
};
