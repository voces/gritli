import React from "react";
import { Icon } from "../vel/Icon.tsx";
import { TreeNode } from "./TreeNode.tsx";

export const TableNode = ({
  table,
  isSelected,
  onSelect,
}: {
  table: string;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <TreeNode
    key={table}
    label={(
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon icon="data_sheet" />
        <span
          style={{
            fontWeight: isSelected ? "bold" : "inherit",
          }}
        >
          {table}
        </span>
      </div>
    )}
    onClick={() => {
      if (!isSelected) {
        onSelect();
        return false;
      }
      return true;
    }}
  />
);
