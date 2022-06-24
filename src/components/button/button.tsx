import React, { ComponentPropsWithoutRef } from "react";

type Props = {
  styleType?: "outlined" | "filled";
} & ComponentPropsWithoutRef<"button">;

const Button: React.VFC<Props> = ({
  children,
  className,
  styleType = "filled",
  ...props
}) => {
  let colorStyle = "";
  switch (styleType) {
    case "filled":
      colorStyle = `bg-red-500 text-white ${
        props.disabled ? "opacity-50" : "hover:opacity-50"
      }`;
      break;
    case "outlined":
      colorStyle = `text-red-500 border-2 border-red-500 ${
        props.disabled ? "opacity-50" : "hover:opacity-50"
      }`;
      break;
  }
  return (
    <button
      className={`rounded px-4 py-1.5 font-bold ${colorStyle} ` + className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
