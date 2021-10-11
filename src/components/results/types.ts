type Row = Readonly<
  Record<string, string | number | undefined | boolean | React.ReactElement>
>;

export type Rows = ReadonlyArray<Row>;
