const MYSQL_TYPE_DECIMAL = 0x00;
const MYSQL_TYPE_TINY = 0x01;
export const MYSQL_TYPE_SHORT = 0x02;
export const MYSQL_TYPE_LONG = 0x03;
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
export const MYSQL_TYPE_VARCHAR = 0x0f;
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
export const EDITOR_TYPE_BOOLEAN = 0x100;
export const EDITOR_TYPE_REACT = 0x101;

export const types: Record<
  number,
  "number" | "date" | "string" | "boolean" | "other"
> = {
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
  [EDITOR_TYPE_BOOLEAN]: "boolean",
};
