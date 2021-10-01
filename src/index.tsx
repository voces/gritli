import { ReactDOM } from "./deps.ts";
import { createElement } from "react";
import { theme } from "./theme.ts";
import { App } from "./components/App.tsx";

const root = document.getElementById("root");

if (root)
  for (const [property, value] of Object.entries(theme.variables))
    if (value) root.style.setProperty(property, value);

ReactDOM.render(<App />, root);
