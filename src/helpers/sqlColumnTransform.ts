import { isRecord } from "./typeguards.ts";

// {
//   "Field": "discordId",
//   "Type": "varchar(50)",
//   "Collation": "utf8mb4_unicode_ci",
//   "Null": "NO",
//   "Key": "",
//   "Default": null,
//   "Extra": "",
//   "Privileges": "select,insert,update,references",
//   "Comment": ""
// }

type SqlColumnRow = {
  Field: string;
  Type: string;
  Null: "NO" | "YES";
  Default: string | null;
  Comment: string | null;
  Key: string | null;
  Collation: string | null;
};

export type SqlColumn = {
  name: string;
  dataType: string;
  dataLength: number | undefined;
  unsigned: boolean | undefined;
  nullable: boolean;
  default: string | undefined;
  comment: string | undefined;
  collation: string | undefined;
  key: string | null;
};

const isSqlColumnRow = (row: unknown): row is SqlColumnRow =>
  isRecord(row) && typeof row.Field === "string" &&
  typeof row.Type === "string" &&
  (typeof row.Default === "string" || row.Default === null);

const extractDataType = (str: string): string => {
  const value = str.match(/^\w+/)?.[0];
  if (!value) throw new Error(`Unable to extract datatype from '${str}'`);
  return value;
};

const extractDataLength = (str: string): number | undefined => {
  const value = str.match(/^(\w+)\((\d+)\)/)?.[2];
  if (value) return parseInt(value);
};

const extractSign = (str: string): boolean | undefined => {
  const isNumeric = !!str.match(/^(int|float|tinyint|bigint)/);
  if (!isNumeric) return;
  return !!str.match(/unsigned$/);
};

export const sqlColumnTransform = (
  rows:
    | ReadonlyArray<
      Readonly<Record<string, string | number | boolean | undefined>>
    >
    | undefined,
): SqlColumn[] => {
  if (!rows) return [];
  const columns: SqlColumn[] = [];
  for (const row of rows) {
    if (!isSqlColumnRow(row)) continue;
    columns.push({
      name: row.Field,
      dataType: extractDataType(row.Type),
      dataLength: extractDataLength(row.Type),
      unsigned: extractSign(row.Type),
      nullable: row.IS_NULLABLE === "YES",
      default: row.Default ?? undefined,
      comment: row.Comment ?? undefined,
      collation: row.Collation ?? undefined,
      key: row.Key,
    });
  }
  return columns;
};
