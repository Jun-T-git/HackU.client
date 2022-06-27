import React from "react";
import Card from "~/components/card/card";
import { User } from "~/types/user";

type Props = {
  users: User[];
  onClickConnect: (toUserId: string, toUser: string) => void;
};

const List: React.VFC<Props> = ({ users, onClickConnect }) => {
  const list = users.map((user) => {
    return (
      <li key={user.userId} className="m-0.5">
        <Card
          {...user}
          onClickConnect={(id, name) => {
            onClickConnect(id, name);
          }}
        />
      </li>
    );
  });
  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
};

export default List;
