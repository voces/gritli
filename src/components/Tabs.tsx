import { theme } from "../theme.ts";
import React, { useEffect, useMemo, useState } from "react";

export const Tabs = ({
  children,
  onNewTab,
  onCloseTab,
  selectedTabState,
  style,
}: {
  children: React.ReactNode;
  onNewTab?: () => void;
  onCloseTab?: (index: number) => void;
  selectedTabState?: [number, React.Dispatch<React.SetStateAction<number>>];
  style?: React.CSSProperties;
}) => {
  const [selectedTab, setSelectedTab] = selectedTabState ?? useState(0);

  // We need an array to index into
  const childrenArr = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const actualSelectedTab = Math.min(selectedTab, childrenArr.length - 1);

  const tabLabelBase = { padding: 8, fontSize: 14, cursor: "pointer" };

  // Extract labels from children
  const labels = useMemo(() => {
    const labels: React.ReactNodeArray = [];
    childrenArr.forEach((child, i) => {
      if (React.isValidElement(child) && child.props.label) {
        labels.push(
          <span
            onClick={() => setSelectedTab(i)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              ...tabLabelBase,
              ...theme.tabs.label.base,
              ...(i === actualSelectedTab
                ? theme.tabs.label.selected
                : undefined),
            }}
          >
            <span>{child.props.label}</span>
            {onCloseTab && child.props.canClose !== false && (
              <span
                title="Close (⌥W)"
                style={{
                  fontSize: 10,
                  opacity: 0.6,
                  padding: 4,
                  ...theme.tabs.label.close,
                }}
                onClick={(e) => {
                  onCloseTab(i);
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                ✕
              </span>
            )}
          </span>,
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
        maxHeight: "100%",
        ...theme.tabs.container,
        ...style,
      }}
    >
      <div style={{ display: "flex" }}>
        {labels.map((l, i) => <React.Fragment key={i}>{l}</React.Fragment>)}
        {onNewTab && (
          <span
            title="New query (⌥T)"
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
        )}
        <span style={{ flexGrow: 1, cursor: undefined }}></span>
      </div>
      <div style={{ flexGrow: 1, overflow: "auto", ...theme.tabs.content }}>
        {childrenArr[actualSelectedTab]}
      </div>
    </div>
  );
};
