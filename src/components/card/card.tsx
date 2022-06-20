import React from "react";

type Props = {
  cardId: number;
  name: string;
  prefecture: string;
};

const Card: React.VFC<Props> = ({
  cardId,
  name,
  prefecture,
}) => {
  return (
    <div id={`select-${cardId}`} className="grid grid-cols-2 max-w-sm rounded overflow-hidden shadow-lg text-center bg-white border-gray-500">
      <h1>
        {name}
      </h1>
      <h2>
        {prefecture}
      </h2>
    </div>
  );
};

export default Card;
