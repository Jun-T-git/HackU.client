import React from "react";

type Props = {
  showItem: {
    cardId: number,
    name: string,
    prefecture: string,
  },
};

const Card: React.VFC<Props> = ({
  showItem,
}) => {
  return (
    <div id={`card-${showItem.cardId}`} className="grid grid-cols-2 max-w-sm rounded overflow-hidden shadow-lg text-center bg-white border-gray-500">
      <h1>
        {showItem.name}
      </h1>
      <h2>
        {showItem.prefecture}
      </h2>
    </div>
  );
};

export default Card;
