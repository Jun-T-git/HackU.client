import React from "react";
import RankingCard from "~/components/card/rankingCard";
import { User } from "~/types/user";

type Props = {
  users: User[];
};

const RankingList: React.VFC<Props> = ({ users }) => {
  return (
    <>
      {users.map((user, i) => {
        return (
          <li key={user.userId}>
            <RankingCard rank={i + 1} {...user} />
          </li>
        );
      })}
    </>
  );
};

export default RankingList;
