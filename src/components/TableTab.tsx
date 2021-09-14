import {
  EDITOR_TYPE_BOOLEAN,
  MYSQL_TYPE_SHORT,
  MYSQL_TYPE_VARCHAR,
} from "../constants.ts";
import { QueryContext } from "../contexts/QueryContext.ts";
import { React } from "../deps.ts";
import {
  SqlColumn,
  sqlColumnTransform,
} from "../helpers/sqlColumnTransform.ts";
import { useQuery } from "../hooks/useQuery.tsx";
import { useSessionState } from "../hooks/useSessionState.ts";
import { theme } from "../theme.ts";
import { Icon, IconType } from "./Icon.tsx";
import { QueryResults } from "./QueryResults.tsx";
import { Tabs } from "./Tabs.tsx";

const Placeholder = ({}: { label: React.ReactNode }) => <div>Placeholder</div>;

const InputRow = ({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div style={{ margin: "0.25em 1em", display: "flex" }}>
    <label
      style={{
        display: "inline-block",
        width: "8em",
        verticalAlign: "top",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    style={{
      width: "13em",
      padding: 2,
      fontSize: "80%",
      ...props.style,
      ...theme.input,
    }}
  />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    style={{
      width: "13em",
      resize: "vertical",
      font: "inherit",
      fontSize: "80%",
      ...props.style,
      ...theme.input,
    }}
  />
);

type BasicData = {
  name: string;
  description: string;
  columns: SqlColumn[];
};

const BasicTab = ({ data }: { label: React.ReactNode; data: BasicData }) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <InputRow label="Name">
      <Input style={{ flexGrow: 1 }} value={data.name} />
    </InputRow>
    <InputRow label="Comment">
      <TextArea style={{ flexGrow: 1 }} rows={5} />
    </InputRow>
    <div style={{ flexGrow: 1 }}>
      <div style={{ marginBottom: "0.25em" }}>Columns</div>
      <QueryResults
        results={{
          duration: 0,
          fields: [
            { name: "#", fieldType: MYSQL_TYPE_SHORT },
            { name: "Name", fieldType: MYSQL_TYPE_VARCHAR },
            { name: "Datatype", fieldType: MYSQL_TYPE_VARCHAR },
            { name: "Length/Set", fieldType: MYSQL_TYPE_SHORT },
            { name: "Unsigned", fieldType: EDITOR_TYPE_BOOLEAN },
            { name: "Allow NULL", fieldType: EDITOR_TYPE_BOOLEAN },
            // { name: "Zerofill", fieldType: MYSQL_TYPE_VARCHAR },
            { name: "Default", fieldType: MYSQL_TYPE_VARCHAR },
            { name: "Comment", fieldType: MYSQL_TYPE_VARCHAR },
            // { name: "Collation", fieldType: MYSQL_TYPE_VARCHAR },
            // { name: "Expression", fieldType: MYSQL_TYPE_VARCHAR },
            // { name: "Virtuality", fieldType: MYSQL_TYPE_VARCHAR },
          ],
          rows: data.columns.map((column) => ({
            "#": column.ordinalPosition,
            Name: column.name,
            Datatype: column.dataType,
            "Length/Set": column.dataLength,
            Unsigned: column.unsigned,
            "Allow NULL": column.nullable,
            Default: column.default,
            Comment: column.comment,
          })),
        }}
      />
    </div>
  </div>
);

const Label = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: IconType;
}) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Icon icon={icon} style={{ paddingRight: 2 }} />
    {children}
  </div>
);

export const TableTab = ({ label: table }: { label: string }) => {
  const { database } = React.useContext(QueryContext);
  const selectedTabState = useSessionState("tableTab", 0);
  const query = useQuery();
  const [basicData, setBasicData] = React.useState<BasicData>({
    name: table,
    description: "",
    columns: [],
  });

  React.useEffect(() => {
    query(
      `SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = '${database}' AND TABLE_NAME = '${table}';`
    ).then((ret) =>
      setBasicData({
        ...basicData,
        columns: sqlColumnTransform(ret.rows) ?? [],
      })
    );
  }, [database, table]);

  return (
    <Tabs selectedTabState={selectedTabState} style={{ height: "100%" }}>
      <BasicTab label={<Label icon="grid">Basic</Label>} data={basicData} />
      <Placeholder label={<Label icon="support">Options</Label>} />
      <Placeholder label={<Label icon="flash_on">Indexes</Label>} />
      <Placeholder label={<Label icon="tree_structure">Foreign keys</Label>} />
      <Placeholder label={<Label icon="pie_chart">Partitions</Label>} />
      <Placeholder label={<Label icon="add_database">CREATE code</Label>} />
      <Placeholder
        label={<Label icon="data_configuration">ALTER code</Label>}
      />
    </Tabs>
  );
};
