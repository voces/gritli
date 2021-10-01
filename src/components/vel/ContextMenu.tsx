import { React } from "../../deps.ts";
import { theme } from "../../theme.ts";

type ActualOption = {
  type: "option";
  label: React.ReactNode;
  onClick: () => void;
};

type OptionSeparator = { type: "option-separator" };

export type Option = ActualOption | OptionSeparator;

const OptionComponent = ({ option }: { option: Option }) => {
  const [hovered, setHovered] = React.useState(false);

  if (option.type === "option-separator") {
    return (
      <div style={{ margin: "4px 8px", ...theme.contextMenu.separator }}></div>
    );
  }

  return (
    <div
      onClick={() => option.onClick()}
      style={{
        fontSize: 14,
        padding: "4px 32px",
        cursor: "pointer",
        ...theme.contextMenu.option,
        ...(hovered ? theme.contextMenu.optionHovered : undefined),
      }}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {option.label}
    </div>
  );
};

export const ContextMenu = ({
  options,
  shown,
  left,
  top,
}: {
  options: Option[];
  shown: boolean;
  left: number | undefined;
  top: number | undefined;
}) => {
  return (
    <>
      {shown && (
        <div
          style={{
            position: "absolute",
            top,
            left,
            zIndex: 100,
            boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.2)",
            padding: "6px 0",
            ...theme.contextMenu.container,
          }}
        >
          {options.map((o, i) => (
            <OptionComponent key={i} option={o} />
          ))}
        </div>
      )}
    </>
  );
};
