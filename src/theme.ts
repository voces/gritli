const isDarkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

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
    head?: React.CSSProperties;
    cell?: React.CSSProperties;
    number?: React.CSSProperties;
    string?: React.CSSProperties;
    date?: React.CSSProperties;
    other?: React.CSSProperties;
  };
};

const commonTheme: Theme = {
  monaco: "light",
  tabs: {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
    },
    label: {
      base: {
        padding: 4,
        fontSize: 14,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 1,
        borderStyle: "solid",
        cursor: "pointer",
      },
      selected: {
        borderBottomWidth: 0,
        marginBottom: 1,
      },
      close: {
        fontSize: 10,
        opacity: 0.6,
      },
    },
    newTab: {
      borderRightWidth: 0,
      fontWeight: "bold",
    },
    content: {
      flexGrow: 1,
    },
  },
  divider: {
    background: "#444",
  },
  table: {
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
};

const darkTheme: Theme = {
  monaco: "vs-dark",
  panel: {
    title: {
      backgroundColor: "#29292d",
      color: "#eaeaea",
    },
    container: {
      backgroundColor: "#202124",
      color: "#d4d4d4",
    },
  },
  divider: {
    background: "#556",
  },
  table: {
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
};

const lightTheme: Theme = {
  tabs: {
    label: {
      base: {
        backgroundColor: "#ececec",
        borderColor: "#888",
      },
      selected: {
        backgroundColor: "white",
      },
    },
  },
};

const deepAssign = <T>(base: T, ...sources: T[]): T => {
  for (const source of sources)
    for (const prop in source) {
      if (
        typeof source[prop] === "object" &&
        source[prop] !== null &&
        base[prop]
      )
        deepAssign(base[prop], source[prop]);
      else base[prop] = source[prop];
    }
  return base;
};

export const theme: Theme = deepAssign(
  commonTheme,
  isDarkMode ? darkTheme : lightTheme
);
