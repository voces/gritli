import React from "react";
import { Input } from "./Input.tsx";
import { InputRow } from "./InputRow.tsx";
import { TextArea } from "./TextArea.tsx";

export type BasicData = {
  name: string;
  comment: string;
};

export const BasicTab = ({
  data,
  onChange,
}: {
  label: React.ReactNode;
  data: BasicData;
  onChange: (newValue: Partial<BasicData>) => void;
}) => (
  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <InputRow
      label="Name"
      style={{ marginTop: "0.25em", marginBottom: "0.25em" }}
    >
      <Input
        style={{ flexGrow: 1 }}
        value={data.name}
        onInput={(e) => onChange({ name: e.currentTarget.value })}
      />
    </InputRow>
    <InputRow label="Comment" style={{ flexGrow: 1, marginBottom: "0.25em" }}>
      <TextArea
        style={{ flexGrow: 1 }}
        rows={5}
        value={data.comment}
        onInput={(e) => onChange({ comment: e.currentTarget.value })}
      />
    </InputRow>
  </div>
);
