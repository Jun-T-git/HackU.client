import React, { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

const Button: React.VFC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      className={
        "rounded bg-blue-500 px-3 py-1 font-bold text-white hover:opacity-80 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
