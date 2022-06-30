import React from "react";
import Card from "~/components/card/card";
import RankingCard from "~/components/card/rankingCard";
import { User } from "~/types/user";

type Props = {
  users: User[];
  displayMode: string;
  onClickConnect?: (toUserId: string, toUser: string) => void;
};

const List: React.VFC<Props> = ({ users, displayMode, onClickConnect }) => {
  return (
    <>
      {users.map((user, i) => {
        return (
          <>
            {displayMode === "ranking" ? (
              /* ランキング表示 */
              <li key={user.userId}>
                <RankingCard rank={i + 1} {...user} />
              </li>
            ) : (
              /* ユーザー表示（都道府県、検索） */
              <li key={user.userId} className="m-0.5">
                <Card
                  {...user}
                  onClickConnect={(id, name) => {
                    onClickConnect(id, name);
                  }}
                />
              </li>
            )}
          </>
        );
      })}
    </>
  );
};

export default List;
