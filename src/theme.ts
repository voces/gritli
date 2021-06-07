const urlTheme = new URLSearchParams(location.search).get("theme");
const isDarkMode = urlTheme
  ? (urlTheme === "dark" ? true : false)
  : window.matchMedia?.("(prefers-color-scheme: dark)").matches;

type Theme = {
  monaco?: string;
  panel?: {
    title?: React.CSSProperties;
    content?: React.CSSProperties;
    container?: React.CSSProperties;
  };
  divider?: React.CSSProperties;
  tabs?: {
    container?: React.CSSProperties;
    label?: {
      selected?: React.CSSProperties;
      base?: React.CSSProperties;
      close?: React.CSSProperties;
    };
    newTab?: React.CSSProperties;
    content?: React.CSSProperties;
  };
  table?: {
    container?: React.CSSProperties;
    head?: React.CSSProperties;
    cell?: React.CSSProperties;
    number?: React.CSSProperties;
    string?: React.CSSProperties;
    date?: React.CSSProperties;
    other?: React.CSSProperties;
  };
  tree?: {
    guides?: {
      base?: React.CSSProperties;
    };
  };
  contextMenu?: {
    container?: React.CSSProperties;
    option?: React.CSSProperties;
    optionHovered?: React.CSSProperties;
    separator?: React.CSSProperties;
  };
  nav?: {
    container?: React.CSSProperties;
  };
};

const commonTheme: Theme = {
  monaco: "light",
  tabs: {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      backgroundColor: "#F3F3F3",
    },
    label: {
      base: {
        padding: 8,
        fontSize: 14,
        cursor: "pointer",
        backgroundColor: "#ececec",
      },
      selected: {
        backgroundColor: "white",
      },
      close: {
        fontSize: 10,
        opacity: 0.6,
        padding: 4,
      },
    },
    newTab: {
      borderRightWidth: 0,
      fontWeight: "bold",
      backgroundColor: "transparent",
    },
    content: {
      flexGrow: 1,
    },
  },
  divider: {
    backgroundColor: "#F3F3F3",
  },
  table: {
    container: {
      backgroundColor: "white",
    },
    cell: {
      whiteSpace: "pre",
      border: "1px solid #ccc",
      padding: "2px 4px",
      maxWidth: 300,
      maxHeight: 200,
      overflow: "auto",
    },
    number: {
      color: "#098658",
      textAlign: "right",
    },
    string: {
      color: "#0000ff",
    },
    date: {
      color: "#e07400",
    },
  },
  contextMenu: {
    container: {
      //   backgroundColor: "#3C3C3C",
      boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.2)",
      padding: "6px 0",
    },
    option: {
      fontSize: 14,
      padding: "4px 32px",
      cursor: "pointer",
      color: "#111",
    },
    optionHovered: {
      backgroundColor: "#0060C0",
      color: "white",
    },
    separator: {
      borderBottom: "1px solid #eee",
      margin: "4px 8px",
    },
  },
  nav: {
    container: {
      backgroundColor: "#F3F3F3",
    },
  },
};

const darkTheme: Theme = {
  monaco: "vs-dark",
  panel: {
    title: {
      backgroundColor: "#29292d",
      color: "#eaeaea",
    },
    container: {
      backgroundColor: "#1e1e1e",
      color: "#d4d4d4",
    },
  },
  table: {
    container: {
      backgroundColor: "#1E1E1E",
    },
    head: {
      color: "#d4d4d4",
    },
    cell: {
      borderColor: "#333",
    },
    number: {
      color: "#b5cea8",
    },
    string: {
      color: "#569cd6",
    },
    date: {
      color: "#e07400",
    },
  },
  tree: { guides: { base: { borderColor: "#556" } } },
  tabs: {
    container: {
      backgroundColor: "#252526",
    },
    label: {
      base: {
        backgroundColor: "#2D2D2D",
      },
      selected: {
        backgroundColor: "#1e1e1e",
      },
    },
  },
  nav: {
    container: {
      backgroundColor: "#252526",
    },
  },
  contextMenu: {
    container: {
      backgroundColor: "#3C3C3C",
    },
    option: {
      color: "#eee",
    },
    optionHovered: {
      backgroundColor: "#094771",
    },
    separator: {
      borderBottom: "1px solid #6F6F6F",
    },
  },
  divider: {
    backgroundColor: "#252526",
  },
};

const deepAssign = <T>(base: T, ...sources: T[]): T => {
  for (const source of sources) {
    for (const prop in source) {
      if (
        typeof source[prop] === "object" &&
        source[prop] !== null &&
        base[prop]
      ) {
        deepAssign(base[prop], source[prop]);
      } else base[prop] = source[prop];
    }
  }
  return base;
};

export const theme: Theme = isDarkMode
  ? deepAssign(
    commonTheme,
    darkTheme,
  )
  : commonTheme;
