import { React } from "../deps.ts";
import { theme } from "../theme.ts";

export const Tabs = ({
  children,
  onNewTab,
  onCloseTab,
}: {
  children: React.ReactNode;
  onNewTab: () => void;
  onCloseTab: (index: number) => void;
}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  // We need an array to index into
  const childrenArr = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code.startsWith("Digit") && e.altKey) {
        e.preventDefault();
        const key = Math.min(
          childrenArr.length,
          parseInt(e.code[e.code.length - 1]) - 1
        );
        if (key === childrenArr.length) {
          onNewTab();
        }
        setSelectedTab(key);
      } else if (e.code === "KeyW" && e.altKey) {
        e.preventDefault();
        onCloseTab(selectedTab);
        setSelectedTab(selectedTab);
      }
    };
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [selectedTab, childrenArr.length]);

  const actualSelectedTab = Math.min(selectedTab, childrenArr.length - 1);

  const tabLabelBase = { padding: 8, fontSize: 14, cursor: "pointer" };

  // Extract labels from children
  const labels = React.useMemo(() => {
    const labels: React.ReactNodeArray = [];
    childrenArr.forEach((child, i) => {
      if (React.isValidElement(child) && child.props.label) {
        labels.push(
          <span
            onClick={() => setSelectedTab(i)}
            style={{
              ...tabLabelBase,
              ...theme.tabs.label.base,
              ...(i === actualSelectedTab
                ? theme.tabs.label.selected
                : undefined),
            }}
          >
            <span>{child.props.label}</span>
            <span
              style={{
                fontSize: 10,
                opacity: 0.6,
                padding: 4,
                ...theme.tabs.label.close,
              }}
              onClick={() => {
                onCloseTab(i);
              }}
            >
              ✕
            </span>
          </span>
        );
      }
    });
    return labels;
  }, [childrenArr, actualSelectedTab]);

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        ...theme.tabs.container,
      }}
    >
      <div style={{ display: "flex" }}>
        {labels.map((l, i) => (
          <React.Fragment key={i}>{l}</React.Fragment>
        ))}
        <span
          style={{
            ...tabLabelBase,
            ...theme.tabs.label.base,
            borderRightWidth: 0,
            fontWeight: "bold",
            backgroundColor: "transparent",
            ...theme.tabs.newTab,
          }}
          onClick={() => {
            onNewTab();
            setSelectedTab(childrenArr.length);
          }}
        >
          +
        </span>
        <span style={{ flexGrow: 1, cursor: undefined }}></span>
      </div>
      <div style={{ flexGrow: 1, ...theme.tabs.content }}>
        {childrenArr[actualSelectedTab]}
      </div>
    </div>
  );
};
