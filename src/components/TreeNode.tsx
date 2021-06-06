import { React } from "../deps.ts";

export const TreeNode = ({
  label,
  nodes,
  onExpand,
  showGuides = true,
  initialExpanded = false,
}: {
  label: React.ReactNode;
  nodes?: React.ReactNode[];
  onExpand?: () => void;
  showGuides?: boolean;
  initialExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = React.useState(initialExpanded);
  return (
    <div>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setExpanded(!expanded);
          if (!expanded) onExpand?.();
        }}
        style={{ whiteSpace: "nowrap", cursor: "pointer" }}
      >
        {label}
      </span>
      {expanded &&
        nodes?.map((node, i, arr) => (
          <div key={i}>
            {showGuides && (
              <span
                style={{
                  borderLeft: "2px solid black",
                  paddingLeft: 8,
                  marginLeft: 4,
                  position: "absolute",
                  height: i < arr.length - 1 ? (i === 0 ? 17 : 20) : 11,
                  marginTop: i === 0 ? 3 : 0,
                }}
              />
            )}
            {showGuides && (
              <span
                style={{
                  borderBottom: "2px solid black",
                  paddingLeft: 8,
                  marginLeft: 4,
                  position: "absolute",
                  height: 10,
                }}
              />
            )}
            <span style={{ position: "relative", left: showGuides ? 16 : 0 }}>
              {node}
            </span>
          </div>
        ))}
    </div>
  );
};
