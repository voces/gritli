import { types } from "../constants.ts";
import { React } from "../deps.ts";
import { theme } from "../theme.ts";
import { ContextMenu } from "./ContextMenu.tsx";

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

const QueryContextMenu = (
  { shown, x, y }: {
    shown: boolean;
    x: number | undefined;
    y: number | undefined;
  },
) =>
  <ContextMenu
    shown={shown}
    left={x}
    top={y}
    options={[{
      type: "option",
      label: "Option 1",
      onClick: () => console.log("clicked option 1"),
    }, {
      type: "option",
      label: "Option 2",
      onClick: () => console.log("clicked option 2"),
    }, {
      type: "option-separator",
    }, {
      type: "option",
      label: "Option 3",
      onClick: () => console.log("clicked option 3s"),
    }]}
  />;

const ResultTable = (
  { handleContextMenu, handleClick, error, rows, fields }: {
    handleContextMenu: (value: { x: number; y: number }) => void;
    handleClick: () => boolean;
    error: Results["error"];
    rows: Results["rows"];
    fields: Results["fields"];
  },
) =>
  <table
    style={{
      borderCollapse: "collapse",
      borderStyle: "hidden",
      minHeight: "100%",
      minWidth: "100%",
      fontSize: 12,
      ...theme.table?.container,
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
      <thead style={theme.table?.head}>
        <tr>
          {fields.map((f, i) => (
            <th key={`${f.name}-${i}`} style={theme.table?.cell}>
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
                ...theme.table?.cell,
                ...theme.table?.[types[fields?.[i].fieldType ?? 0]],
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
          <td style={{ color: "red", ...theme.table?.cell }}>
            {error}
          </td>
          <td style={{ width: "99%" }}></td>
        </tr>
      )}
      <tr>
        {(fields ? Object.keys(fields) : ["placeholder"])
          .map(
            (
              i,
            ) => (
              <td key={i} style={{ height: "99%" }}></td>
            ),
          )}
        <td style={{ height: "99%", width: "99%" }}></td>
      </tr>
    </tbody>
  </table>;

export const QueryResults = ({ results }: { results: Results }) => {
  const [contextMenu, setContextMenu] = React.useState<
    { x: number; y: number } | undefined
  >();

  return (
    <>
      <QueryContextMenu
        shown={!!contextMenu}
        x={contextMenu?.x}
        y={contextMenu?.y}
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
