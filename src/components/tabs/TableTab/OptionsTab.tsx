import React from "react";
import { Input } from "vel/Input.tsx";
import { InputRow } from "./InputRow.tsx";

export type OptionsData = {
  autoIncrement: number | undefined;
  defaultCollation: string;
  engine: string;
  rowFormat: string;
  checksum: boolean;
};

export const OptionsTab = ({
  data,
}: {
  label: React.ReactNode;
  data: OptionsData;
}) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <InputRow
      label="Auto increment"
      style={{ marginTop: "0.25em", marginBottom: "0.25em" }}
    >
      <Input style={{ flexGrow: 1 }} value={data.autoIncrement} type="number" />
    </InputRow>
    <InputRow label="Checksum" style={{ marginBottom: "0.25em" }}>
      <Input
        checked={data.checksum}
        type="checkbox"
        style={{ width: undefined, padding: 0, margin: "3px 0" }}
      />
    </InputRow>
    <InputRow label="Row format" style={{ marginBottom: "0.25em" }}>
      <Input style={{ flexGrow: 1 }} value={data.rowFormat} />
    </InputRow>
    <InputRow label="Default collation" style={{ marginBottom: "0.25em" }}>
      <Input style={{ flexGrow: 1 }} value={data.defaultCollation} />
    </InputRow>
    <InputRow label="Engine" style={{ marginBottom: "0.25em" }}>
      <Input style={{ flexGrow: 1 }} value={data.engine} />
    </InputRow>
  </div>
);
