import { randomUUID } from "../../helpers/uuid.ts";
import { Panel, Node } from "./Panel.tsx";
import { render } from "react-dom";
import { createElement } from "react";

const root = document.getElementById("root");

const tree: Node = {
  id: "root",
  children: [
    {
      id: "body",
      direction: "horizontal",
      children: [
        { id: "sidebar", size: 200, title: "Sidebar" },
        {
          id: "main",
          children: [
            {
              id: "queries",
              tabs: true,
              children: [
                {
                  id: "query-1",
                  title: "Query 1",
                  children: "SELECT * FROM elo.outcomes LIMIT 1;\n".repeat(100),
                },
                {
                  id: "query-2",
                  title: "Query 2",
                  children: "SELECT * FROM elo.outcomes LIMIT 1;",
                },
              ],
            },
            { id: "output", children: "Output" },
          ],
        },
      ],
    },
    { id: "footer", size: 19, children: "Footer" },
  ],
};

const stack = [tree];
while (stack.length) {
  const node = stack.pop()!;

  if (!node.id) node.id = randomUUID();

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      Object.defineProperty(child, "parent", { value: node, writable: true });
      stack.push(child);
    }
  }
}

// deno-lint-ignore no-explicit-any
(window as any).tree = tree;

render(<Panel node={tree} style={{ width: "100%", height: "100%" }} />, root);
