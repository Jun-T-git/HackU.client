import React from "react";
import Button from "~/components/button/button" 

export type User = {
  id: number,
  name: string,
  prefecture: string,
};

type Props = 
  User & {onClickConnect: (toUser: (string)) => void}


const Card: React.VFC<Props> = ({
  id,
  name,
  prefecture,
  onClickConnect,
}) => {
  return (
    <div id={`card-${id}`} className="grid grid-cols-3 rounded overflow-hidden shadow-lg text-center bg-white border-b border-gray-400 py-2">
      <span>
        {name}
      </span>
      <span>
        {prefecture}
      </span>
      <Button
        className="max-w-max bg-red-500"
        onClick={() => {name && onClickConnect(name);}}
      >
        つながる
      </Button>
    </div>
  );
};

export default Card;
