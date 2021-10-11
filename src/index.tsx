import "./init.ts";
import { render } from "react-dom";
import React from "react";
import { theme } from "./theme.ts";
import { App } from "./components/App.tsx";

const root = document.getElementById("root");

if (root) {
  for (const [property, value] of Object.entries(theme.variables)) {
    if (value) root.style.setProperty(property, value);
  }
}

render(<App />, root);
