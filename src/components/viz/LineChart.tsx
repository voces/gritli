import { React, d3 } from "../../deps.ts";

type Row = Record<
  string,
  string | number | undefined | boolean | React.ReactElement
>;
type Rows = Row[];

const deduceDataMap = (
  data: Rows
): { xAxis: string; yAxis: string; series: string[] } => {
  const columns = Object.keys(data[0]);
  const columnTypes = Object.values(data[0]).map((v) => typeof v);

  const numberColumns = columns.filter((_, i) => columnTypes[i] === "number");

  const xAxis = numberColumns[0];
  const yAxis = numberColumns[1];
  const series = columns.filter((v) => v !== xAxis && v !== yAxis);

  return { xAxis, yAxis, series };
};

export const LineChart = ({ data }: { data: Rows }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!data[0]) return;
    if (!svgRef.current) return;
    const parent = svgRef.current.parentElement?.parentElement;
    if (!parent) return;

    svgRef.current.setAttribute(
      "viewbox",
      `0 0 ${parent.clientWidth} ${parent.clientHeight}`
    );
    svgRef.current.style.width = "100%";
    svgRef.current.style.height = "100%";

    const dataMap = deduceDataMap(data);

    const svg = d3.select(svgRef.current);

    const xAxisValues = data.map((r) => r[dataMap.xAxis] as number);
    const yAxisValues = data.map((r) => r[dataMap.yAxis] as number);

    const xAxis = d3
      .scaleLinear()
      .domain([Math.min(...xAxisValues), Math.max(...xAxisValues)])
      .range([10, parent.clientWidth - 10]);

    const yAxis = d3
      .scaleLinear()
      .domain([Math.min(...yAxisValues), Math.max(...yAxisValues)])
      .range([parent.clientHeight - 10, 10]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const line = d3
      .line()
      .x((d) => xAxis(d[0]))
      .y((d) => yAxis(d[1]));

    const lines = Object.entries(
      data.reduce((lines, row) => {
        const series = dataMap.series.map((c) => row[c]).join("-");
        if (!lines[series]) lines[series] = [];
        lines[series].push([row[dataMap.xAxis], row[dataMap.yAxis]] as [
          number,
          number
        ]);
        return lines;
      }, {} as Record<string, [key: number, value: number][]>)
    );

    svg
      .selectAll("path")
      .data(lines)
      .join((enter) =>
        enter
          .append("path")
          .attr("fill", "none")
          .attr("stroke", (d) => color(d[0]))
          .attr("stroke-width", 1)
      )
      .attr("d", (d) => line(d[1]));
  }, [data, svgRef.current]);

  return <svg style={{ width: 0, height: 0 }} ref={svgRef} />;
};
