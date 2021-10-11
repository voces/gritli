import React, { useState } from "react";
import { isArray, isRecord } from "../../../helpers/typeguards.ts";
import { Icon } from "vel/Icon.tsx";
import { Label } from "vel/Label.tsx";
import { Panel } from "../../Panels/Panel.tsx";

export type Index = {
  name: string;
  algorithm: string;
  columns: string[];
  type: "primary" | "unique";
};

type IndexRow = {
  // deno-lint-ignore camelcase
  Column_name: string;
  // deno-lint-ignore camelcase
  Index_type: string;
  // deno-lint-ignore camelcase
  Key_name: string;
  // deno-lint-ignore camelcase
  Non_unique: number;
};

const isIndexRow = (row: unknown): row is IndexRow =>
  isRecord(row) &&
  typeof row.Column_name === "string" &&
  typeof row.Index_type === "string" &&
  typeof row.Non_unique === "number" &&
  typeof row.Key_name === "string";

export const indexRowsToObjs = (rows: unknown): Index[] => {
  if (!isArray(rows)) return [];

  const indexes: Record<string, Index> = {};

  for (const row of rows) {
    if (!isIndexRow(row)) continue;

    const index = indexes[row.Key_name] ??
      (indexes[row.Key_name] = {
        name: row.Key_name,
        algorithm: row.Index_type,
        columns: [],
        type: row.Non_unique ? "unique" : "primary",
      });

    index.columns.push(row.Column_name);
  }

  return Object.values(indexes);
};

const IndexActions = () => (
  <Panel fixed>
    <div style={{ display: "flex", flexDirection: "column", margin: 4 }}>
      <Label icon="plus">Add</Label>
      <Label icon="full_trash">Remove</Label>
      <Label icon="cancel">Clear</Label>
      <Label icon="up">Up</Label>
      <Label icon="down">Down</Label>
    </div>
  </Panel>
);

const IndexRow = ({ index }: { index: Index }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div style={{ margin: "2px 2px 4px" }}>
        <Icon
          icon={expanded ? "expand" : "collapse"}
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
        />
        <Label
          icon="key"
          iconStyle={{
            padding: "0 4px 0 2px",
            filter: index.type === "unique" ? "hue-rotate(45deg)" : undefined,
          }}
        >
          {index.name}
        </Label>
        {expanded &&
          index.columns.map((
            column,
          ) => (
            <Label icon="puzzle" style={{ marginLeft: 32, display: "flex" }}>
              {column}
            </Label>
          ))}
      </div>
      <div style={{ margin: "2px 2px 4px" }}>{index.type}</div>
      <div style={{ margin: "2px 2px 4px" }}>{index.algorithm}</div>
    </>
  );
};

export const IndexTab = ({
  indexes,
}: {
  label: React.ReactNode;
  indexes: Index[];
}) => (
  <Panel style={{ position: "relative", height: "100%" }}>
    <IndexActions />
    <Panel>
      <div
        style={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "3fr 1fr 1fr",
          alignContent: "start",
        }}
      >
        <div style={{ margin: "2px 2px 4px" }}>Name</div>
        <div style={{ margin: "2px 2px 4px" }}>Type / Length</div>
        <div style={{ margin: "2px 2px 4px" }}>Algorithm</div>
        {indexes.map((index) => <IndexRow index={index} />)}
      </div>
    </Panel>
  </Panel>
);
