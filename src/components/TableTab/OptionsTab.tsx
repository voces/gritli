import { React } from "../../deps.ts";
import { Input } from "./Input.tsx";
import { InputRow } from "./InputRow.tsx";
import { TextArea } from "./TextArea.tsx";

export type OptionsData = {
  autoIncrement: number | undefined;
  defaultCollation: string;
  engine: string;
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
      <Input style={{ flexGrow: 1 }} value={data.autoIncrement} />
    </InputRow>
    <InputRow label="Default collation" style={{ marginBottom: "0.25em" }}>
      <Input style={{ flexGrow: 1 }} value={data.defaultCollation} />
    </InputRow>
    <InputRow label="Engine" style={{ marginBottom: "0.25em" }}>
      <Input style={{ flexGrow: 1 }} value={data.engine} />
    </InputRow>
  </div>
);
