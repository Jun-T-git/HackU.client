import React from "react";
import Card from "~/components/card/card"

type Props = {
  listId: String;
  showList: Object[];
};

const List: React.VFC<Props> = ({
  listId,
  showList,
}) => {
  const list = showList.map((showItem, index) => {
    return (
      <li key={index} className="m-0.5">
        <Card
          showIem={showItem}
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
