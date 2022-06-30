import React from "react";
import { User } from "~/types/user";
import { getPrefectureNameById } from "~/libs/functions/prefecture";

type Props = { rank: number } & User;

const RankingCard: React.VFC<Props> = ({
  rank,
  userName,
  prefectureId,
  point,
}) => {
  return (
    <div className="grid grid-cols-10 items-center overflow-hidden rounded-md py-3 px-3 text-center">
      <span className="col-span-1 justify-self-start font-bold">{rank}</span>
      <span className="col-span-4 justify-self-start font-bold">
        {userName}
      </span>
      <span className="col-span-3 justify-self-start text-sm">
        {getPrefectureNameById(prefectureId)}
      </span>
      <span className="col-span-2 justify-self-end font-bold">
        {point}
        <span className="ml-1 text-sm text-[#555555]">pt</span>
      </span>
    </div>
  );
};

export default RankingCard;
