import React from "react";
import { theme } from "../../theme.ts";
import { useAppSelector } from "../../hooks/storeHooks.ts";
import { ConnectionNode } from "./ConnectionNode.tsx";

export const Nav = () => {
  const { connection: selected, connections } = useAppSelector((state) => ({
    connection: state.connection.connection,
    connections: state.connections,
  }));

  return (
    <nav
      style={{
        padding: "2px 4px",
        width: "100%",
        overflow: "auto",
        fontSize: 14,
        ...theme.nav.container,
      }}
    >
      {connections.map((c) => (
        <ConnectionNode
          key={JSON.stringify(c)}
          connection={c}
          selected={c === selected}
        />
      ))}
    </nav>
  );
};
