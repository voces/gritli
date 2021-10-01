import React from "react";
import { theme } from "../../theme.ts";

export const Divider = ({
  direction,
  index,
  fixed,
}: {
  direction: "vertical" | "horizontal";
  index: number;
  fixed: boolean;
}) => {
  const style: React.CSSProperties = {};

  if (direction === "horizontal") {
    style.height = 1;
    if (!fixed) style.cursor = "ns-resize";
  } else {
    style.width = 1;
    if (!fixed) style.cursor = "ew-resize";
  }

  return (
    <div
      className="divider"
      style={{ flexShrink: 0, zIndex: 1, ...style, ...theme.divider }}
      data-index={index}
      data-fixed={fixed}
    ></div>
  );
};
