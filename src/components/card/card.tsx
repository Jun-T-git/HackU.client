import React from "react";
import Button from "~/components/button/button";
import { getPrefectureNameById } from "~/libs/functions/prefecture";
import { User } from "~/types/user";

type Props = User & { onClickConnect: (toUserId: (string), toUser: (string)) => void };

const Card: React.VFC<Props> = ({ userId, userName, prefectureId, onClickConnect }) => {
  return (
    <div className="grid grid-cols-3 items-center overflow-hidden border-b border-gray-400 bg-white py-3 px-3 text-center">
      <span className="justify-self-start font-bold">{userName}</span>
      <span className="justify-self-start text-sm">
        {getPrefectureNameById(prefectureId)}
      </span>
      <Button
        styleType="outlined"
        className="max-w-[100px] justify-self-end text-sm"
        onClick={() => {
          userId && userName && onClickConnect(userId, userName);;
        }}
      >
        つながる
      </Button>
    </div>
  );
};

export default Card;
