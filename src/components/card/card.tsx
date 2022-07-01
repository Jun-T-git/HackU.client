import React from "react";
import Button from "~/components/button/button";
import { getPrefectureNameById } from "~/libs/functions/prefecture";
import { User } from "~/types/user";

type Props = {
  connectStatus: string | null;
  onClickConnect: (toUserId: string, toUser: string) => void;
} & User;

const Card: React.VFC<Props> = ({
  userId,
  userName,
  prefectureId,
  connectStatus,
  onClickConnect,
}) => {
  return (
    <div className="grid grid-cols-10 items-center overflow-hidden border-b border-gray-400 bg-white py-3 px-3 text-center">
      <span className="col-span-3 justify-self-start font-bold">
        {userName}
      </span>
      <span className="col-span-2 justify-self-start text-sm">
        {getPrefectureNameById(prefectureId)}
      </span>
      <span className="col-span-2 flex justify-center gap-x-0.5 justify-self-center text-sm">
        {(connectStatus == "online" || connectStatus == "both") && (
          <span className="text-blue-600">●</span>
        )}
        {(connectStatus == "offline" || connectStatus == "both") && (
          <span className="text-red-600">●</span>
        )}
      </span>
      <Button
        styleType="outlined"
        className="col-span-3 max-w-[100px] justify-self-end text-sm"
        onClick={() => {
          userId && userName && onClickConnect(userId, userName);
        }}
      >
        つながる
      </Button>
    </div>
  );
};

export default Card;
