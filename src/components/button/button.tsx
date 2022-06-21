import React, { ComponentPropsWithoutRef } from "react";

type Props = {
  onClickConnect?: (toUser: string) => void;
  connectToUser?: string;
} & ComponentPropsWithoutRef<"button">;

const Button: React.VFC<Props> = ({ children, onClickConnect, className, connectToUser, ...props}) => {
  return (
    <button
      className={
        "rounded bg-blue-500 px-3 py-1 font-bold text-white hover:opacity-80 " +
        className
      }
      type={props.type}
      {...props}
      onClick={() => {
        onClickConnect(connectToUser);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
