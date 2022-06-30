import React, { useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import List from "~/components/list/list";
import { User } from "~/types/user";
import { rankedUsers } from "~/libs/api/user";
import { dummyRankedUsers } from "~/ts/dummy";
import Header from "~/components/header/header";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";

type Props = {
  ranking: User[];
};

const Index: NextPage<Props> = ({ ranking }) => {
  const signedInUser = useRecoilValue(userState);

  const router = useRouter();
  const isReady = router.isReady;

  useEffect(() => {
    if (signedInUser.userId == "") {
      router.push("/");
    }
  }, [signedInUser.userId]);

  if (!isReady || signedInUser.userId == "") {
    return <div className="py-5 text-center text-[#555555]">Loading...</div>;
  }
  return (
    <>
      <Header userId={signedInUser.userId} />
      <div className="py-[70px] px-5 text-center">
        <h2 className="mb-2 text-lg font-bold text-white">
          つながりランキング
        </h2>
        <div className="rounded-md bg-white">
          <ul className="flex flex-col divide-y">
            <List users={ranking} displayMode="ranking" />
          </ul>
        </div>
      </div>
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
