import { isRecord } from "./typeguards.ts";

type SqlColumnRow = {
  COLUMN_NAME: string;
  COLUMN_TYPE: string;
  IS_NULLABLE: "NO" | "YES";
  COLUMN_DEFAULT: string | null;
  COLUMN_COMMENT: string | null;
  ORDINAL_POSITION: number;
};

export type SqlColumn = {
  name: string;
  dataType: string;
  dataLength: number | undefined;
  unsigned: boolean | undefined;
  nullable: boolean;
  default: string | undefined;
  comment: string | undefined;
  ordinalPosition: number;
};

const isSqlColumnRow = (row: unknown): row is SqlColumnRow =>
  isRecord(row) && typeof row.COLUMN_NAME === "string" &&
  typeof row.COLUMN_TYPE === "string" &&
  (typeof row.COLUMN_DEFAULT === "string" || row.COLUMN_DEFAULT === null);

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
  const isNumeric = !!str.match(/^(int|float|tinyint)/);
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
      name: row.COLUMN_NAME,
      dataType: extractDataType(row.COLUMN_TYPE),
      dataLength: extractDataLength(row.COLUMN_TYPE),
      unsigned: extractSign(row.COLUMN_TYPE),
      nullable: row.IS_NULLABLE === "YES",
      default: row.COLUMN_DEFAULT ?? undefined,
      comment: row.COLUMN_COMMENT ?? undefined,
      ordinalPosition: row.ORDINAL_POSITION,
    });
  }
  return columns;
};
