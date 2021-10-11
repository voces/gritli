import { EDITOR_TYPE_REACT, types } from "../../constants.ts";
import React, { useState } from "react";
import { theme } from "../../theme.ts";
import { ContextMenu } from "vel/ContextMenu.tsx";
import type { Option } from "vel/ContextMenu.tsx";
import { Rows } from "./types.ts";
import { Viz } from "./viz/Viz.tsx";

type FieldDef = {
  readonly catalog?: "def";
  readonly schema?: "";
  readonly table?: "";
  readonly originName?: "";
  readonly fieldFlag?: 129;
  readonly originTable?: "";
  readonly fieldLen?: 3;
  readonly name: string;
  readonly fieldType: keyof typeof types;
  readonly encoding?: 63;
  readonly decimals?: 0;
  readonly defaultVal?: "";
};

export type Results = {
  duration: number;
  error?: string;
  rows?: ReadonlyArray<
    Readonly<Record<string, string | number | undefined | boolean>>
  >;
  fields?: FieldDef[];
};

type DisplayMode = "viz" | "table";

const QueryContextMenu = ({
  shown,
  x,
  y,
  rows,
  handleHide,
  display,
  setDisplay,
}: {
  shown: boolean;
  x: number | undefined;
  y: number | undefined;
  rows?: Results["rows"];
  handleHide: () => void;
  display: DisplayMode;
  setDisplay: (value: DisplayMode) => void;
}) => {
  const options: Option[] = [];
  if (rows) {
    options.push(
      {
        type: "option" as const,
        label: "Copy as TSV",
        onClick: () => {
          navigator.clipboard.writeText(
            [
              Object.keys(rows[0]).join("\t"),
              ...rows.map((row) => Object.values(row).join("\t")),
            ].join("\n"),
          );
          handleHide();
        },
      },
      {
        type: "option" as const,
        label: "Copy as markdown",
        onClick: () => {
          if (!rows) return;

          const columns = Object.keys(rows[0]);
          const stringRows: string[][] = [columns];
          const columnWidths = columns.map((k) => k.length);
          const columnTypes = Object.values(rows[0]).map((v) => typeof v);

          for (let i = 0; i < rows.length; i++) {
            const row: string[] = [];
            stringRows.push(row);
            for (let n = 0; n < columns.length; n++) {
              const str = (rows[i][columns[n]] ?? "").toString();
              row.push(str);
              if (columnWidths[n] < str.length) columnWidths[n] = str.length;
            }
          }

          // Separate table head from body
          stringRows.splice(
            1,
            0,
            columnWidths.map((w) => "-".repeat(w)),
          );

          navigator.clipboard.writeText(
            stringRows
              .map((row) =>
                row
                  .map((v, i) =>
                    columnTypes[i] === "number"
                      ? v.padStart(columnWidths[i], " ")
                      : v.padEnd(columnWidths[i], " ")
                  )
                  .join(" | ")
              )
              .join("\n"),
          );
          handleHide();
        },
      },
      { type: "option-separator" },
    );
  }
  if (display !== "table") {
    options.push({
      type: "option" as const,
      label: "Table",
      onClick: () => {
        setDisplay("table");
        handleHide();
      },
    });
  }
  if (display !== "viz") {
    options.push({
      type: "option" as const,
      label: "Viz",
      onClick: () => {
        setDisplay("viz");
        handleHide();
      },
    });
  }
  return <ContextMenu shown={shown} left={x} top={y} options={options} />;
};

const tableCellStyle: React.CSSProperties = {
  whiteSpace: "pre",
  padding: "2px 4px",
  maxWidth: 300,
  maxHeight: 200,
  overflow: "auto",
};

export const ResultTable = ({
  handleContextMenu,
  handleClick,
  error,
  rows,
  fields,
}: {
  handleContextMenu?: (value: { x: number; y: number }) => void;
  handleClick?: () => boolean;
  error?: Results["error"];
  rows?: Rows;
  fields: Results["fields"];
}) => (
  <table
    style={{
      borderCollapse: "collapse",
      borderStyle: "hidden",
      minHeight: "100%",
      minWidth: "100%",
      fontSize: 12,
      ...theme.table.container,
    }}
    onContextMenu={(e) => {
      handleContextMenu?.({ x: e.pageX, y: e.pageY });
      e.preventDefault();
    }}
    onClick={(e) => {
      if (handleClick?.()) {
        e.preventDefault();
      }
    }}
  >
    {fields && (
      <thead style={theme.table.head}>
        <tr>
          {fields.map((f, i) => (
            <th
              key={`${f.name}-${i}`}
              style={{ ...tableCellStyle, ...theme.table.cell }}
            >
              {f.name}
            </th>
          ))}
          <th style={{ width: "99%" }}></th>
        </tr>
      </thead>
    )}
    <tbody>
      {rows?.slice(0, 1000).map((r, i) => (
        <tr key={i}>
          {(fields?.map((f) => [f.name, r[f.name]]) ?? Object.entries(r)).map(
            (d, i) => (
              <td
                key={i}
                style={{
                  ...tableCellStyle,
                  ...theme.table.cell,
                  textAlign: (types[fields?.[i].fieldType ?? 0] === "number" &&
                    "right") ||
                    (types[fields?.[i].fieldType ?? 0] === "boolean" &&
                      "center") ||
                    "inherit",
                  ...theme.table[types[fields?.[i].fieldType ?? 0]],
                }}
              >
                {(types[fields?.[i].fieldType ?? 0] === "boolean" && (
                  <input
                    type="checkbox"
                    checked={d[1] === true}
                    disabled={typeof d[1] !== "boolean"}
                  />
                )) ||
                  (fields?.[i].fieldType === EDITOR_TYPE_REACT && d[1]) ||
                  d[1]?.toString()}
              </td>
            ),
          )}
          <td style={{ width: "99%" }}></td>
        </tr>
      ))}

      {error && (
        <tr>
          <td style={{ ...tableCellStyle, color: "red", ...theme.table.cell }}>
            {error}
          </td>
          <td style={{ width: "99%" }}></td>
        </tr>
      )}
      <tr>
        {(fields ? Object.keys(fields) : ["placeholder"]).map((
          i,
        ) => <td key={i} style={{ height: "99%" }}></td>)}
        <td style={{ height: "99%", width: "99%" }}></td>
      </tr>
    </tbody>
  </table>
);

const ResultsComponent = ({
  results,
  handleContextMenu,
  handleClick,
  display,
}: {
  results: Results;
  handleContextMenu: (value: { x: number; y: number }) => void;
  handleClick: () => boolean;
  display: DisplayMode;
}) => {
  if (display === "table") {
    return (
      <ResultTable
        rows={results.rows}
        fields={results.fields}
        error={results.error}
        handleContextMenu={handleContextMenu}
        handleClick={handleClick}
      />
    );
  }

  const rows = results.rows?.map((r) =>
    Object.fromEntries(
      Object.entries(r).map(([column, value], i) => {
        if (
          types[results?.fields?.[i].fieldType ?? 0] === "date" &&
          (typeof value === "string" || typeof value === "number")
        ) {
          return [column, new Date(value).getTime()];
        }
        return [column, value];
      }),
    )
  );

  if (display === "viz" && rows) {
    return (
      <Viz
        data={rows}
        handleContextMenu={handleContextMenu}
        handleClick={handleClick}
      />
    );
  }

  return <>Other</>;
};

export const QueryResults = ({ results }: { results: Results }) => {
  const [contextMenu, setContextMenu] = useState<
    { x: number; y: number } | undefined
  >();
  const [display, setDisplay] = useState<DisplayMode>("table");

  return (
    <>
      <QueryContextMenu
        shown={!!contextMenu}
        x={contextMenu?.x}
        y={contextMenu?.y}
        rows={results.rows}
        handleHide={() => setContextMenu(undefined)}
        display={display}
        setDisplay={setDisplay}
      />
      <ResultsComponent
        display={display}
        results={results}
        handleContextMenu={({ x, y }) => {
          setContextMenu({ x, y });
        }}
        handleClick={() => {
          if (contextMenu) {
            setContextMenu(undefined);
            return true;
          }
          return false;
        }}
      />
    </>
  );
};
