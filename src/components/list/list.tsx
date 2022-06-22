import React from "react";
import Card, { User } from "~/components/card/card"

type Props = {
  listId,
  users: User[],
  onClickConnect: (toUser: string) => void;
};

const List: React.VFC<Props> = ({
  listId,
  users,
  onClickConnect,
}) => {
  const list = users.map((user, index) => {
    return (
      <li key={index} className="m-0.5">
        <Card
          {...user}
          onClickConnect={(name) => {onClickConnect(name);}}
        />
      </li>
    );
  });
  return (
    <div id={`${listId}-list`}>
      <ul>{list}</ul>
    </div>
  );
};

export default List;
