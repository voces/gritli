import { React } from "../deps.ts";
import { theme } from "../theme.ts";

const MYSQL_TYPE_DECIMAL = 0x00;
const MYSQL_TYPE_TINY = 0x01;
const MYSQL_TYPE_SHORT = 0x02;
const MYSQL_TYPE_LONG = 0x03;
const MYSQL_TYPE_FLOAT = 0x04;
const MYSQL_TYPE_DOUBLE = 0x05;
const MYSQL_TYPE_NULL = 0x06;
const MYSQL_TYPE_TIMESTAMP = 0x07;
const MYSQL_TYPE_LONGLONG = 0x08;
const MYSQL_TYPE_INT24 = 0x09;
const MYSQL_TYPE_DATE = 0x0a;
const MYSQL_TYPE_TIME = 0x0b;
const MYSQL_TYPE_DATETIME = 0x0c;
const MYSQL_TYPE_YEAR = 0x0d;
const MYSQL_TYPE_NEWDATE = 0x0e;
const MYSQL_TYPE_VARCHAR = 0x0f;
const MYSQL_TYPE_BIT = 0x10;
const MYSQL_TYPE_TIMESTAMP2 = 0x11;
const MYSQL_TYPE_DATETIME2 = 0x12;
const MYSQL_TYPE_TIME2 = 0x13;
const MYSQL_TYPE_NEWDECIMAL = 0xf6;
const MYSQL_TYPE_ENUM = 0xf7;
const MYSQL_TYPE_SET = 0xf8;
const MYSQL_TYPE_TINY_BLOB = 0xf9;
const MYSQL_TYPE_MEDIUM_BLOB = 0xfa;
const MYSQL_TYPE_LONG_BLOB = 0xfb;
const MYSQL_TYPE_BLOB = 0xfc;
const MYSQL_TYPE_VAR_STRING = 0xfd;
const MYSQL_TYPE_STRING = 0xfe;
const MYSQL_TYPE_GEOMETRY = 0xff;

const types: Record<number, "number" | "date" | "string" | "other"> = {
  [MYSQL_TYPE_DECIMAL]: "number",
  [MYSQL_TYPE_TINY]: "number",
  [MYSQL_TYPE_SHORT]: "number",
  [MYSQL_TYPE_LONG]: "number",
  [MYSQL_TYPE_FLOAT]: "number",
  [MYSQL_TYPE_DOUBLE]: "number",
  [MYSQL_TYPE_NULL]: "other",
  [MYSQL_TYPE_TIMESTAMP]: "date",
  [MYSQL_TYPE_LONGLONG]: "number",
  [MYSQL_TYPE_INT24]: "number",
  [MYSQL_TYPE_DATE]: "date",
  [MYSQL_TYPE_TIME]: "date",
  [MYSQL_TYPE_DATETIME]: "date",
  [MYSQL_TYPE_YEAR]: "date",
  [MYSQL_TYPE_NEWDATE]: "date",
  [MYSQL_TYPE_VARCHAR]: "string",
  [MYSQL_TYPE_BIT]: "other",
  [MYSQL_TYPE_TIMESTAMP2]: "date",
  [MYSQL_TYPE_DATETIME2]: "date",
  [MYSQL_TYPE_TIME2]: "date",
  [MYSQL_TYPE_NEWDECIMAL]: "number",
  [MYSQL_TYPE_ENUM]: "string",
  [MYSQL_TYPE_SET]: "other",
  [MYSQL_TYPE_TINY_BLOB]: "other",
  [MYSQL_TYPE_MEDIUM_BLOB]: "other",
  [MYSQL_TYPE_LONG_BLOB]: "other",
  [MYSQL_TYPE_BLOB]: "other",
  [MYSQL_TYPE_VAR_STRING]: "string",
  [MYSQL_TYPE_STRING]: "string",
  [MYSQL_TYPE_GEOMETRY]: "other",
};

// const styles: Record<string, React.CSSProperties> = {
//   other: {},
//   number: {
//     color: "#098658",
//   },
//   string: {
//     color: "#0000ff",
//   },
//   date: {
//     color: "#e07400",
//   },
// };

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

export const QueryResults = ({ results }: { results: Results }) => (
  <table
    style={{
      borderCollapse: "collapse",
      borderStyle: "hidden",
      minHeight: "100%",
      minWidth: "100%",
      fontSize: 12,
    }}
  >
    {results.fields && (
      <thead style={theme.table?.head}>
        <tr>
          {results.fields.map((f, i) => (
            <th key={`${f.name}-${i}`} style={theme.table?.cell}>
              {f.name}
            </th>
          ))}
          <th style={{ width: "99%" }}></th>
        </tr>
      </thead>
    )}
    <tbody>
      {results.rows?.slice(0, 1000).map((r, i) => (
        <tr key={i}>
          {Object.values(r).map((d, i) => (
            <td
              key={i}
              style={{
                ...theme.table?.cell,
                ...theme.table?.[types[results.fields?.[i].fieldType ?? 0]],
              }}
            >
              {d}
            </td>
          ))}
          <td style={{ width: "99%" }}></td>
        </tr>
      ))}
      {results.fields && (
        <tr>
          {Object.keys(results.fields).map((i) => (
            <td key={i} style={{ height: "99%" }}></td>
          ))}
          <td style={{ height: "99%", width: "99%" }}></td>
        </tr>
      )}
      {results.error && (
        <tr>
          <td>{results.error}</td>
        </tr>
      )}
    </tbody>
  </table>
);
