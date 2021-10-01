import { randomUUID } from "../../helpers/uuid.ts";
import {
  Fragment,
  createElement,
  useState,
  useEffect,
  useReducer,
} from "react";

export type Node = {
  id?: string;
  tabs?: boolean;
  title?: string;
  children?: Node[] | string;
  size?: number;
  direction?: "horizontal" | "vertical";
  forceUpdate?: () => void;
  parent?: NodeWithChildren;
};

type NodeWithChildren = Node & { children: Node[] };

type PanelProps = {
  style?: React.CSSProperties;
  node: Node;
};

type PanelElement = React.ReactElement<PanelProps>;

let dragged: Node;

const SimplePanelBody = ({
  node,
  direction,
  mouseDelta,
}: {
  direction: "horizontal" | "vertical";
  mouseDelta: number | undefined;
  node: Node & { children: Node[] };
}) => {
  const [persistedSizeOverrides, setPersistedSizeOverrides] = useState<
    number[]
  >(Array(node.children.length).fill(0));
  const [sizeOverrides, setSizeOverrides] = useState<number[]>(
    Array(node.children.length).fill(0)
  );
  const [activeElement, setActiveElement] = useState<number | undefined>();

  useEffect(() => {
    if (typeof activeElement !== "number") return;

    if (typeof mouseDelta !== "number") {
      const newOverrides = persistedSizeOverrides.map(
        (o, i) => o + sizeOverrides[i]
      );
      setPersistedSizeOverrides(newOverrides);
      localStorage.setItem(
        "panel-sizes",
        JSON.stringify(
          Object.fromEntries(
            node.children
              .map((c, i) => [c.id, newOverrides[i]])
              .filter(([k]) => k)
          )
        )
      );
      setSizeOverrides(Array(node.children.length).fill(0));
      return;
    }

    setSizeOverrides([
      ...sizeOverrides.slice(0, activeElement),
      mouseDelta,
      -mouseDelta,
      ...sizeOverrides.slice(activeElement + 2),
    ]);
  }, [mouseDelta]);

  return (
    <>
      {node.children.map((child, idx, arr) => {
        const baseBasis = child.size
          ? `${child.size}px`
          : undefined ?? `${(1 / arr.length) * 100}%`;

        const flexBasis = `calc(${baseBasis} - ${
          persistedSizeOverrides[idx] + sizeOverrides[idx]
        }px)`;

        const childStyle = {
          flexGrow: child.size ? 0 : 1,
          flexShrink: child.size ? 0 : 1,
          overflow: "auto",
          minWidth: 19,
          minHeight: 19,
        };

        if (idx === arr.length - 1)
          return <Panel node={child} style={{ ...childStyle, flexBasis }} />;

        const dividerStyle: React.CSSProperties = {
          padding: direction === "horizontal" ? "0 3px" : "3px 0",
          margin: direction === "horizontal" ? "0 -3px" : "-3px 0",
          zIndex: 1,
          cursor: direction === "horizontal" ? "col-resize" : "row-resize",
        };

        return (
          <>
            <Panel node={child} style={{ ...childStyle, flexBasis }} />
            <div
              style={dividerStyle}
              data-divider
              onMouseDown={(e) => setActiveElement(idx)}
            ></div>
          </>
        );
      })}
    </>
  );
};

const TabPanelBody = ({ children }: { children: Node[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  const titles = children.map((child) => child.title);
  const childrens = children.map((child) => child.children);

  return (
    <>
      <div>
        {titles.map((title, idx) => {
          const props = {
            onClick: () => {
              setActiveTab(idx);
            },
          };

          return (
            <span
              {...props}
              draggable
              onDragStart={() => {
                dragged = children[idx];
              }}
            >
              {title}
            </span>
          );
        })}
      </div>
      <div style={{ overflow: "auto" }}>{childrens[activeTab]}</div>
    </>
  );
};

const moveNode = (node: Node, newParent: Node, index?: number): boolean => {
  // Only do something if newParent can receieve node
  if (!Array.isArray(newParent.children)) {
    console.warn("New parent does not have array children");
    return false;
  }

  if (
    newParent === node.parent &&
    node.parent.children.indexOf(node) === index
  ) {
    console.warn("Trying to move node to existing position");
    return false;
  }

  // Remove node from old parent
  const oldParent = node.parent;
  if (oldParent) {
    const index = oldParent.children.indexOf(node);
    if (index >= 0) oldParent.children.splice(index, 1);
    else console.warn("Node not found in old parent");
  } else {
    console.warn("Node does not have an old parent");
  }

  // Add node to new parent
  if (typeof index === "number") newParent.children.splice(index, 0, node);
  else newParent.children.push(node);

  // Change parent pointer
  node.parent = newParent as NodeWithChildren;

  // Clean up old parent
  if (oldParent && oldParent.children.length === 1 && oldParent.parent) {
    const index = oldParent.parent.children.indexOf(oldParent);
    if (index >= 0) {
      const lastChild = oldParent.children[0];
      oldParent.parent.children.splice(index, 1, lastChild);
      lastChild.parent = oldParent.parent;
      oldParent.parent.forceUpdate?.();
    }
  }

  return true;
};

export const Panel = ({ node, style }: PanelProps): PanelElement => {
  const direction = node.direction ?? "vertical";

  // For resizing
  const [mouseDelta, setMouseDelta] = useState<number | undefined>();

  // For dragging
  const [dragState, setDragState] = useState<
    "left" | "right" | "top" | "bottom" | "center" | undefined
  >();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  Object.defineProperty(node, "forceUpdate", {
    value: forceUpdate,
    configurable: true,
    enumerable: false,
  });

  return (
    <div
      data-panel
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        backgroundColor: "rgba(0,0,0,.1)",
        position: "relative",
        ...style,
      }}
      onMouseDown={(e) => {
        if (
          e.target instanceof HTMLDivElement &&
          e.target.dataset.divider === "true"
        ) {
          setMouseDelta(0);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onMouseMove={(e) => {
        if (typeof mouseDelta === "number")
          setMouseDelta(
            mouseDelta -
              (direction === "horizontal" ? e.movementX : e.movementY)
          );
      }}
      onMouseUp={() => setMouseDelta(undefined)}
      onMouseLeave={() => setMouseDelta(undefined)}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();

        let el: typeof e["target"] | null = e.target;
        while (el && el instanceof HTMLElement && el.dataset.panel !== "true") {
          el = el.parentElement;
        }

        if (!el || !(el instanceof HTMLElement)) {
          return setDragState(undefined);
        }

        const rect = el.getBoundingClientRect();

        const xRel = (e.clientX - rect.left) / rect.width;
        const yRel = (e.clientY - rect.top) / rect.height;

        const newDragState =
          xRel < 0.2
            ? "left"
            : xRel > 0.8
            ? "right"
            : yRel < 0.2
            ? "top"
            : yRel > 0.8
            ? "bottom"
            : "center";

        setDragState(newDragState);
      }}
      onDragLeave={(e) => {
        if (
          !e.relatedTarget ||
          !(e.relatedTarget instanceof HTMLElement) ||
          e.relatedTarget.dataset.panelHover !== "true" ||
          e.relatedTarget.parentElement !== e.currentTarget
        ) {
          setDragState(undefined);
        }
      }}
      onDrop={(e) => {
        setDragState(undefined);

        const originalTarget =
          e.target instanceof HTMLElement && e.target.parentElement;

        if (originalTarget === e.currentTarget) {
          const oldParent = dragged.parent;

          let cur = node;
          let inserted = false;

          if (dragState !== "center") {
            const index =
              dragState === "left" || dragState === "top" ? 0 : undefined;
            const direction =
              dragState === "left" || dragState === "right"
                ? "horizontal"
                : "vertical";

            if (cur.tabs && cur.parent) {
              if (cur.parent.direction === direction) cur = cur.parent;
              else {
                const curIndex = cur.parent.children.indexOf(cur);
                if (curIndex >= 0) {
                  const newNode: NodeWithChildren = {
                    children: [cur],
                    direction: direction,
                    id: randomUUID(),
                    parent: cur.parent,
                  };
                  cur.parent.children[curIndex] = newNode;
                  cur.parent = newNode;
                  cur = newNode;
                }
              }
            }
            inserted = moveNode(dragged, cur, index);
          } else {
            // Not a tabbed panel
            if (!cur.tabs) {
              // If we have no children (we're a leaf) and parent is tabbed, use it
              if (!Array.isArray(cur.children) && cur.parent?.tabs)
                cur = cur.parent;
              // Else insert a tabbed panel
              else if (cur.parent) {
                const oldIndex = cur.parent.children.indexOf(cur);
                const newNode = {
                  children: [cur],
                  id: randomUUID(),
                  parent: cur.parent,
                  tabs: true,
                };
                cur.parent.children.splice(oldIndex, 1, newNode);
                cur.parent = newNode;
                cur = newNode;
              }
            }
            inserted = moveNode(dragged, cur);
          }

          if (inserted) {
            oldParent?.forceUpdate?.();
            cur.parent?.forceUpdate?.();
          }
        }
      }}
    >
      {node.title && (
        <div
          draggable
          onDragStart={() => {
            dragged = node;
          }}
        >
          {node.title}
        </div>
      )}
      {typeof node.children === "object" ? (
        node.tabs ? (
          <TabPanelBody children={node.children} />
        ) : (
          <SimplePanelBody
            direction={direction}
            mouseDelta={mouseDelta}
            node={{ ...node, children: node.children }}
          />
        )
      ) : (
        node.children
      )}
      {dragState && (
        <div
          data-panel-hover
          style={{
            position: "absolute",
            backgroundColor: "rgba(50,50,200,0.25)",
            top: dragState === "top" ? 0 : undefined,
            left: dragState === "left" ? 0 : undefined,
            right: dragState === "right" ? 0 : undefined,
            bottom: dragState === "bottom" ? 0 : undefined,
            width:
              dragState === "left" || dragState === "right" ? "50%" : "100%",
            height:
              dragState === "top" || dragState === "bottom" ? "50%" : "100%",
          }}
        ></div>
      )}
    </div>
  );
};
