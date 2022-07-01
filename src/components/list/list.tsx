import React from "react";
import Card from "~/components/card/card";
import RankingCard from "~/components/card/rankingCard";
import { ConnectedUsers } from "~/types/connection";
import { User } from "~/types/user";

type Props = {
  users: User[];
  connectedUsers?: ConnectedUsers;
  onClickConnect?: (toUserId: string, toUser: string) => void;
};

const List: React.VFC<Props> = ({ users, connectedUsers, onClickConnect }) => {
  return (
    <div>
      {users.map((user) => {
        const connectStatus = Object.keys(connectedUsers).includes(user.userId)
          ? connectedUsers[user.userId]
          : null;
        return (
          <li key={user.userId} className="m-0.5">
            <Card
              {...user}
              onClickConnect={(id, name) => {
                onClickConnect(id, name);
              }}
              connectStatus={connectStatus}
            />
          </li>
        );
      })}
      <div className="flex flex-col gap-y-1 rounded border-[#777777] py-5 px-5 text-xs">
        <div className="flex gap-x-2">
          <span className="text-red-600">●</span>
          <span className="text-[#555555]">直接会って話した</span>
        </div>
        <div className="flex gap-x-2">
          <span className="text-blue-600">●</span>
          <span className="text-[#555555]">オンラインで話した</span>
        </div>
      </div>
    </div>
  );
};

export default List;
