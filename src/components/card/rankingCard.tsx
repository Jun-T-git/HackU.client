import React from "react";
import { User } from "~/types/user";
import { getPrefectureNameById } from "~/libs/functions/prefecture";

type Props = User;

const RankingCard: React.VFC<Props> = ({ userName, prefectureId, point }) => {
  return (
    <div className="grid grid-cols-3 items-center overflow-hidden border-b border-gray-400 bg-white py-3 px-3 text-center">
      <span className="justify-self-start font-bold">
        {userName}
      </span>
      <span className="justify-self-start text-sm">
        {getPrefectureNameById(prefectureId)}
      </span>
      <span className="justify-self-start text-sm">
        {point}
      </span>
    </div>
  );
};

export default RankingCard;
