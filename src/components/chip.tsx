import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Chip: React.VFC<Props> = ({ children }) => {
  return (
    <span className="rounded-full border-2 border-blue-800 px-1.5 py-0.5 text-center text-xs font-bold text-blue-800">
      {children}
    </span>
  );
};

export default Chip;
