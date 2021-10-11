import React from "react";
import { Rows } from "../types.ts";
import { LineChart } from "./LineChart.tsx";

export const Viz = ({
  data,
  handleContextMenu,
  handleClick,
}: {
  data: Rows;
  handleContextMenu?: (value: { x: number; y: number }) => void;
  handleClick?: () => boolean;
}) => (
  <LineChart
    data={data}
    handleContextMenu={handleContextMenu}
    handleClick={handleClick}
  />
);
