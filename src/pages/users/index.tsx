import React from "react";
import Card from "~/components/card/card"
import { dummyUsers } from "~/ts/dummy"

const Index: React.VFC = () => {
  const user = dummyUsers
  const list = user.map((user, index) => {
    return (
      <li key={index} className="m-0.5">
        <Card
          cardId={user.id}
          name={user.name}
          prefecture={user.prefecture}
        />
      </li>
    );
  });
  return (
    <>
      <h1 className="text-xl font-bold">ユーザ一覧ページ</h1>
      <ul>{list}</ul>
    </>
  );
};

export default Index;
