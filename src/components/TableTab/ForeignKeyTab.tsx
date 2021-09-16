import { React } from "../../deps.ts";
import { isArray, isRecord } from "../../helpers/typeguards.ts";
import { Label } from "../Label.tsx";
import { Panel } from "../Panel.tsx";

type ForeignKeyColumns = {
  column: string;
  referencedColumn: string;
};

export type ForeignKey = {
  columns: ForeignKeyColumns[];
  deleteRule: string;
  name: string;
  referencedTable: string;
  updateRule: string;
};

type ForeignKeyRow = {
  // deno-lint-ignore camelcase
  constraint_name: string;
  // deno-lint-ignore camelcase
  column_name: string;
  // deno-lint-ignore camelcase
  referenced_table_name: string;
  // deno-lint-ignore camelcase
  referenced_column_name: string;
  // deno-lint-ignore camelcase
  update_rule: string;
  // deno-lint-ignore camelcase
  delete_rule: string;
};

const isForeignKeyRow = (row: unknown): row is ForeignKeyRow =>
  isRecord(row) &&
  typeof row.column_name === "string" &&
  typeof row.constraint_name === "string" &&
  typeof row.delete_rule === "string" &&
  typeof row.referenced_column_name === "string" &&
  typeof row.referenced_table_name === "string" &&
  typeof row.update_rule === "string";

export const foreignKeyRowsToObjs = (rows: unknown): ForeignKey[] => {
  if (!isArray(rows)) return [];

  const foreignKeys: Record<string, ForeignKey> = {};

  for (const row of rows) {
    if (!isForeignKeyRow(row)) continue;

    const foreignKey =
      foreignKeys[row.constraint_name] ??
      (foreignKeys[row.constraint_name] = {
        columns: [],
        deleteRule: row.delete_rule,
        name: row.constraint_name,
        referencedTable: row.referenced_table_name,
        updateRule: row.update_rule,
      });

    foreignKey.columns.push({
      column: row.column_name,
      referencedColumn: row.referenced_column_name,
    });
  }

  return Object.values(foreignKeys);
};

const ForeignKeyActions = () => (
  <Panel fixed>
    <div style={{ display: "flex", flexDirection: "column", margin: 4 }}>
      <Label icon="plus">Add</Label>
      <Label icon="full_trash">Remove</Label>
      <Label icon="cancel">Clear</Label>
    </div>
  </Panel>
);

const ForeignKeyRow = ({ foreignKey }: { foreignKey: ForeignKey }) => (
  <>
    <div style={{ margin: "2px 2px 4px" }}>
      <Label icon="link" iconStyle={{ padding: "0 4px 0 2px" }}>
        {foreignKey.name}
      </Label>
    </div>
    <div style={{ margin: "2px 2px 4px" }}>
      {foreignKey.columns.map((c) => c.column).join(",")}
    </div>
    <div style={{ margin: "2px 2px 4px" }}>{foreignKey.referencedTable}</div>
    <div style={{ margin: "2px 2px 4px" }}>
      {foreignKey.columns.map((c) => c.referencedColumn).join(",")}
    </div>
    <div style={{ margin: "2px 2px 4px" }}>{foreignKey.updateRule}</div>
    <div style={{ margin: "2px 2px 4px" }}>{foreignKey.deleteRule}</div>
  </>
);

export const ForeignKeyTab = ({
  foreignKeys,
}: {
  label: React.ReactNode;
  foreignKeys: ForeignKey[];
}) => (
  <Panel style={{ position: "relative", height: "100%" }}>
    <ForeignKeyActions />
    <Panel>
      <div
        style={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr",
          alignContent: "start",
        }}
      >
        <div style={{ margin: "2px 2px 4px" }}>Key name</div>
        <div style={{ margin: "2px 2px 4px" }}>Columns</div>
        <div style={{ margin: "2px 2px 4px" }}>Reference table</div>
        <div style={{ margin: "2px 2px 4px" }}>Foreign columns</div>
        <div style={{ margin: "2px 2px 4px" }}>On UPDATE</div>
        <div style={{ margin: "2px 2px 4px" }}>On DELETE</div>
        {foreignKeys.map((foreignKey) => (
          <ForeignKeyRow foreignKey={foreignKey} />
        ))}
      </div>
    </Panel>
  </Panel>
);
