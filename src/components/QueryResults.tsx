import { types } from "../constants.ts";
import { React } from "../deps.ts";
import { theme } from "../theme.ts";
import { ContextMenu } from "./ContextMenu.tsx";
import type { Option } from "./ContextMenu.tsx";

type FieldDef = {
  catalog: "def";
  schema: "";
  table: "";
  originName: "";
  fieldFlag: 129;
  originTable: "";
  fieldLen: 3;
  name: string;
  fieldType: keyof typeof types;
  encoding: 63;
  decimals: 0;
  defaultVal: "";
};

export type Results = {
  duration: number;
  error?: string;
  rows?: Record<string, string | number>[];
  fields?: FieldDef[];
};

const QueryContextMenu = ({
  shown,
  x,
  y,
  rows,
  handleHide,
}: {
  shown: boolean;
  x: number | undefined;
  y: number | undefined;
  rows?: Results["rows"];
  handleHide: () => void;
}) => {
  const options: Option[] = [];
  if (rows)
    options.push(
      {
        type: "option" as const,
        label: "Copy as TSV",
        onClick: () => {
          navigator.clipboard.writeText(
            [
              Object.keys(rows[0]).join("\t"),
              ...rows.map((row) => Object.values(row).join("\t")),
            ].join("\n")
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
              const str = rows[i][columns[n]].toString();
              row.push(str);
              if (columnWidths[n] < str.length) columnWidths[n] = str.length;
            }
          }

          // Separate table head from body
          stringRows.splice(
            1,
            0,
            columnWidths.map((w) => "-".repeat(w))
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
              .join("\n")
          );
          handleHide();
        },
      }
    );
  return <ContextMenu shown={shown} left={x} top={y} options={options} />;
};

const tableCellStyle: React.CSSProperties = {
  whiteSpace: "pre",
  padding: "2px 4px",
  maxWidth: 300,
  maxHeight: 200,
  overflow: "auto",
};

const ResultTable = ({
  handleContextMenu,
  handleClick,
  error,
  rows,
  fields,
}: {
  handleContextMenu: (value: { x: number; y: number }) => void;
  handleClick: () => boolean;
  error: Results["error"];
  rows: Results["rows"];
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
      handleContextMenu({ x: e.pageX, y: e.pageY });
      e.preventDefault();
    }}
    onClick={(e) => {
      if (handleClick()) {
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
          {Object.values(r).map((d, i) => (
            <td
              key={i}
              style={{
                ...tableCellStyle,
                ...theme.table.cell,
                textAlign:
                  types[fields?.[i].fieldType ?? 0] === "number"
                    ? "right"
                    : "inherit",
                ...theme.table[types[fields?.[i].fieldType ?? 0]],
              }}
            >
              {d}
            </td>
          ))}
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
        {(fields ? Object.keys(fields) : ["placeholder"]).map((i) => (
          <td key={i} style={{ height: "99%" }}></td>
        ))}
        <td style={{ height: "99%", width: "99%" }}></td>
      </tr>
    </tbody>
  </table>
);

export const QueryResults = ({ results }: { results: Results }) => {
  const [contextMenu, setContextMenu] =
    React.useState<{ x: number; y: number } | undefined>();

  return (
    <>
      <QueryContextMenu
        shown={!!contextMenu}
        x={contextMenu?.x}
        y={contextMenu?.y}
        rows={results.rows}
        handleHide={() => setContextMenu(undefined)}
      />
      <ResultTable
        rows={results.rows}
        fields={results.fields}
        error={results.error}
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
