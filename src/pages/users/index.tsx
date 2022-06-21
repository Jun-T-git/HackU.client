import React from "react";
import List from "~/components/list/list"

import { dummyUsers } from "~/ts/dummy"

const Index: React.VFC = () => {
  const user = dummyUsers
  return (
    <>
      <h1 className="text-xl font-bold">ユーザ一覧ページ</h1>
      <List
        listId="user"
        showList={user}
      />
    </>
  );
};

export default Index;
