import "react";

const urlTheme = new URLSearchParams(location.search).get("theme");
const isDarkMode = urlTheme
  ? urlTheme === "dark" ? true : false
  : window.matchMedia?.("(prefers-color-scheme: dark)").matches;

type Theme = {
  monaco: string;
  variables: {
    "--color-primary": React.CSSProperties["color"];
    "--color-secondary": React.CSSProperties["color"];
    "--color-tertiary": React.CSSProperties["color"];
    "--color-number": React.CSSProperties["color"];
    "--color-string": React.CSSProperties["color"];
    "--color-date": React.CSSProperties["color"];
    "--color-focus": React.CSSProperties["color"];
    "--background-primary": React.CSSProperties["backgroundColor"];
    "--background-secondary": React.CSSProperties["backgroundColor"];
    "--background-tertiary": React.CSSProperties["backgroundColor"];
    "--background-focus": React.CSSProperties["backgroundColor"];
    "--border-primary": React.CSSProperties["color"];
    "--border-secondary": React.CSSProperties["color"];
  };
  panel: {
    title?: React.CSSProperties;
    content?: React.CSSProperties;
    container: React.CSSProperties;
  };
  divider: React.CSSProperties;
  tabs: {
    container: React.CSSProperties;
    label: {
      selected: React.CSSProperties;
      base: React.CSSProperties;
      close?: React.CSSProperties;
    };
    newTab?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  table: {
    container: React.CSSProperties;
    head?: React.CSSProperties;
    cell: React.CSSProperties;
    number: React.CSSProperties;
    string: React.CSSProperties;
    date: React.CSSProperties;
    boolean?: React.CSSProperties;
    other?: React.CSSProperties;
  };
  tree: {
    guides: {
      base: React.CSSProperties;
    };
  };
  contextMenu: {
    container: React.CSSProperties;
    option: React.CSSProperties;
    optionHovered: React.CSSProperties;
    separator: React.CSSProperties;
  };
  nav: {
    container: React.CSSProperties;
  };
  input?: React.CSSProperties;
  textSelect?: {
    container?: React.CSSProperties;
    input?: React.CSSProperties;
    inputFocused?: React.CSSProperties;
    option?: React.CSSProperties;
    optionFocused?: React.CSSProperties;
    optionHotkey?: React.CSSProperties;
  };
  badge?: {
    red?: React.CSSProperties;
    green?: React.CSSProperties;
  };
  extend: (source: DeepPartial<Theme>) => Theme;
};

const deepAssign = <T>(base: T, ...sources: DeepPartial<T>[]) => {
  for (const source of sources) {
    for (const prop in source) {
      const value = source[prop];
      if (typeof value === "object" && value !== null && base[prop]) {
        // deno-lint-ignore no-explicit-any
        deepAssign(base[prop], value as any);
        // deno-lint-ignore no-explicit-any
      } else base[prop] = value as any;
    }
  }
  return base;
};

// JUST USE CSS VARIABLES....

const theme: Theme = {
  monaco: "light",
  variables: {
    "--color-primary": "black",
    "--color-secondary": "#111",
    "--color-tertiary": "#556",
    "--color-number": "#098658",
    "--color-string": "#0000ff",
    "--color-date": "#e07400",
    "--color-focus": "white",
    "--background-primary": "white",
    "--background-secondary": "#f3f3f3",
    "--background-tertiary": "#ececec",
    "--background-focus": "#0060C0",
    "--border-primary": "#eee",
    "--border-secondary": "#eee",
  },
  panel: {
    container: {
      backgroundColor: "var(--background-primary)",
      color: "var(--color-primary)",
    },
  },
  tabs: {
    container: {
      backgroundColor: "var(--background-secondary)",
    },
    label: {
      base: {
        backgroundColor: "var(--background-tertiary)",
      },
      selected: {
        backgroundColor: "var(--background-primary)",
      },
    },
  },
  divider: {
    backgroundColor: "var(--border-primary)",
  },
  table: {
    container: {
      backgroundColor: "var(--background-primary)",
    },
    cell: {
      border: "1px solid var(--border-secondary)",
    },
    number: {
      color: "var(--color-number)",
    },
    string: {
      color: "var(--color-string)",
    },
    date: {
      color: "var(--color-date)",
    },
  },
  contextMenu: {
    container: {
      backgroundColor: "var(--background-primary)",
    },
    option: {
      color: "var(--color-secondary)",
    },
    optionHovered: {
      backgroundColor: "var(--background-focus)",
      color: "var(--color-focus)",
    },
    separator: {
      borderBottom: "1px solid var(--border-primary)",
    },
  },
  nav: {
    container: {
      backgroundColor: "var(--background-secondary)",
    },
  },
  tree: {
    guides: {
      base: {
        borderColor: "var(--color-tertiary)",
      },
    },
  },
  input: {
    backgroundColor: "var(--background-primary)",
    border: "1px solid var(--border-primary)",
    color: "var(--color-primary)",
  },
  textSelect: {
    container: {
      backgroundColor: "var(--background-primary)",
    },
    input: {
      backgroundColor: "var(--background-secondary)",
    },
    inputFocused: {
      border: "1px solid var(--color-secondary)",
    },
    option: {
      color: "var(--color-primary)",
    },
    optionFocused: {
      color: "var(--color-focus)",
      backgroundColor: "var(--background-focus)",
    },
    optionHotkey: {
      color: "var(--color-secondary)",
      backgroundColor: "var(--background-tertiary)",
    },
  },
  badge: {
    red: {
      backgroundColor: "#f5424b",
      color: "var(--color-focus)",
    },
    green: {
      backgroundColor: "#42f578",
      color: "var(--color-focus)",
    },
  },
  extend: (source: DeepPartial<Theme>): Theme => {
    deepAssign(theme, source);

    return theme;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

if (isDarkMode) {
  theme.extend({
    monaco: "vs-dark",
    variables: {
      "--color-primary": "white",
      "--color-secondary": "#eee",
      "--color-tertiary": "#667",
      "--color-number": "#b5cea8",
      "--color-string": "#569cd6",
      "--color-date": "#e07400",
      "--background-primary": "#1e1e1e",
      "--background-secondary": "#252526",
      "--background-tertiary": "#2D2D2D",
      "--background-focus": "#094771",
      "--border-primary": "#6F6F6F",
      "--border-secondary": "#333",
    },
    contextMenu: {
      container: {
        backgroundColor: "var(--background-tertiary)",
      },
    },
  });
}

export { theme };
