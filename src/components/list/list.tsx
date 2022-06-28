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
  const list = users.map((user) => {
    return (
      <div>
        {displayMode === "ranking" ? (
          /* ランキング表示 */
          <div>
            <li key={user.userId} className="m-0.5">
              <RankingCard
                {...user}
              />
            </li>
          </div>
        ) : (
          /* ユーザー表示（都道府県、検索） */
          <div>
            <li key={user.userId} className="m-0.5">
              <Card
                {...user}
                onClickConnect={(id, name) => {
                  onClickConnect(id, name);
                }}
              />
            </li>
          </div>
        )}
      </div>
    );
  });
  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};

export default List;
