import React from "react";
import List from "~/components/list/list";
import { User } from "~/types/user";
import { GetStaticProps, NextPage } from "next";
import { rankedUsers } from "~/libs/api/user";

type Props = {
  users: User[];
};

const Index: NextPage<Props> = ({
  users
}) => {

  return (
    <>
      <h1 className="text-xl font-bold">つながりランキング</h1>
      <List
        users={users}
        displayMode="ranking"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await rankedUsers();
  return {
    props: { users },
    revalidate: 10,
  };
};


export default Index;
