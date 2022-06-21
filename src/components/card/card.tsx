import React from "react";
import Button from "~/components/button/button" 

export type User = {
  id: number,
  name: string,
  hobby: string,
};

type Props = 
  User & {onClickConnect: (toUser: (string)) => void}


const Card: React.VFC<Props> = ({
  id,
  name,
  hobby,
  onClickConnect,
}) => {
  return (
    <div id={`card-${id}`} className="grid grid-cols-3 rounded overflow-hidden shadow-lg text-center bg-white border-b border-gray-400 py-2">
      <h1>
        {name}
      </h1>
      <h2>
        {hobby}
      </h2>
      <Button
        className="max-w-max bg-red-500"
        onClickConnect={onClickConnect}
        connectToUser={name}
      >
        つながる
      </Button>
    </div>
  );
};

export default Card;
