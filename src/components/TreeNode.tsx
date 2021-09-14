import { React } from "../deps.ts";
import { theme } from "../theme.ts";

export const TreeNode = ({
  label,
  nodes,
  onExpand,
  showGuides = true,
  initialExpanded = false,
  onClick,
}: {
  label: React.ReactNode;
  nodes?: React.ReactNode[];
  onExpand?: () => void;
  showGuides?: boolean;
  initialExpanded?: boolean;
  onClick?: (event: React.MouseEvent, expanded: boolean) => boolean;
}) => {
  const [expanded, setExpanded] = React.useState(initialExpanded);
  return (
    <div style={{ fontSize: 13 }}>
      <span
        onClick={(e) => {
          if (onClick) {
            if (!onClick(e, expanded)) return;
          }
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
                  ...theme.tree.guides.base,
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
                  height: 8,
                  ...theme.tree.guides.base,
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
