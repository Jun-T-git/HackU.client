import React from "react";
import List from "~/components/list/list";
import { User } from "~/types/user";
import { GetStaticProps, NextPage } from "next";
import { rankedUsers } from "~/libs/api/user";
import { dummyRankedUsers } from "~/ts/dummy";

type Props = {
  ranking: User[];
};

const Index: NextPage<Props> = ({
  ranking
}) => {

  return (
    <>
      <h1 className="text-xl font-bold">つながりランキング</h1>
      <List
        users={ranking}
        displayMode="ranking"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { ranking } = await rankedUsers();
  // const ranking = dummyRankedUsers;
  return {
    props: { ranking },
    revalidate: 10,
  };
};


export default Index;
