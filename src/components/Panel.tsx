import { React } from "../deps.ts";
import { theme } from "../theme.ts";
import { Divider } from "./Divider.tsx";

const getStoredPanelBasis = (id: string) => {
  const value = localStorage.getItem(`panel-${id}-basis`);
  if (!value) return;
  return parseInt(value);
};

const storePanelBasis = (id: string, basis: number) => {
  localStorage.setItem(`panel-${id}-basis`, basis.toString());
};

export const Panel = ({
  basis,
  children,
  direction = "horizontal",
  fixed = false,
  id,
  style,
  title,
}: {
  basis?: React.CSSProperties["flexBasis"];
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  fixed?: boolean;
  id?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
}) => {
  const [childBasisOverrides, setChildBasisOverrides] = React.useState<
    number[]
  >(
    React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? getStoredPanelBasis(child.props.id)
        : undefined
    ) ?? []
  );
  const dragTarget = React.useRef<HTMLElement>();
  const childArr = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // Captures the event and stores the clicked divider
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.classList.contains("divider") &&
        e.target.dataset.fixed !== "true"
      ) {
        e.preventDefault();
        e.stopPropagation();
        dragTarget.current = e.target;
      }
    },
    []
  );

  //
  const handleMouseMove = React.useCallback(
    (e) => {
      if (!dragTarget.current) return;

      // Get the index from the divider
      const index = parseInt(dragTarget.current.dataset.index ?? "");

      // The divider should be dividing two elements
      const previous = dragTarget.current.previousElementSibling;
      const next = dragTarget.current.nextElementSibling;
      if (!previous || !next) return;

      // Ignore no-diffs
      const diff = direction === "horizontal" ? e.movementX : e.movementY;
      if (diff === 0) return;

      const sizeProp =
        direction === "horizontal" ? "clientWidth" : "clientHeight";

      // Update overrides
      const previousNode = childArr[index];
      if (React.isValidElement(previousNode) && previousNode.props.id) {
        storePanelBasis(
          previousNode.props.id,
          (childBasisOverrides[index] ?? previous[sizeProp]) + diff
        );
      }

      const nextNode = childArr[index + 1];
      if (React.isValidElement(nextNode) && nextNode.props.id) {
        storePanelBasis(
          nextNode.props.id,
          (childBasisOverrides[index + 1] ?? next[sizeProp]) - diff
        );
      }

      setChildBasisOverrides([
        ...childBasisOverrides.slice(0, index),
        (childBasisOverrides[index] ?? previous[sizeProp]) + diff,
        (childBasisOverrides[index + 1] ?? next[sizeProp]) - diff,
        ...childBasisOverrides.slice(index + 2),
      ]);
    },
    [childArr, childBasisOverrides]
  );

  const handleMouseUp = React.useCallback(() => {
    dragTarget.current = undefined;
  }, []);

  const newChildren: React.ReactNodeArray = [];
  for (let i = 0; i < childArr.length; i++) {
    const child = childArr[i];
    const childNode = React.isValidElement(child) ? child : undefined;

    const nextChild = childArr[i + 1];
    const nextChildNode = React.isValidElement(nextChild)
      ? nextChild
      : undefined;

    newChildren.push(
      childNode
        ? React.cloneElement(childNode, {
            basis:
              childBasisOverrides[i] ??
              childNode.props.basis ??
              childNode.props.style?.basis,
          })
        : child
    );
    if (i < childArr.length - 1) {
      newChildren.push(
        <Divider
          key={`divider-${i}`}
          direction={direction === "vertical" ? "horizontal" : "vertical"}
          index={i}
          fixed={childNode?.props.fixed || nextChildNode?.props.fixed || false}
        />
      );
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexBasis: basis ?? style?.flexBasis,
        flexGrow: fixed ? 0 : 1,
        flexShrink: fixed ? 0 : 1,
        overflow: "hidden",
        ...style,
        ...theme.panel.container,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      data-id={id}
    >
      {!!title && (
        <div
          style={{ fontWeight: "bold", padding: "4 8", ...theme.panel.title }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: direction === "vertical" ? "column" : "row",
          overflow: "auto",
          ...theme.panel.content,
        }}
      >
        {newChildren}
      </div>
    </div>
  );
};
