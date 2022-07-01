import React, { useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { User } from "~/types/user";
import { rankedUsers } from "~/libs/api/user";
import { dummyRankedUsers } from "~/ts/dummy";
import Header from "~/components/header/header";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import RankingList from "~/components/list/rankingList";

type Props = {
  ranking: User[];
};

const Index: NextPage<Props> = ({ ranking }) => {
  const signedInUser = useRecoilValue(userState);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && signedInUser.userId == "") {
      router.push("/");
    }
  }, [signedInUser.userId, router.isReady]);

  if (!router.isReady || signedInUser.userId == "") {
    return (
      <span className="flex justify-center py-5 text-[#555555]">
        Loading...
      </span>
    );
  }
  return (
    <>
      <Header userId={signedInUser.userId} />
      <div className="px-5 pb-20 text-center">
        <h2 className="mb-2 text-lg font-bold text-white">
          つながりランキング
        </h2>
        <div className="rounded-md bg-white">
          <ul className="flex flex-col divide-y">
            <RankingList users={ranking} />
          </ul>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { ranking } = await rankedUsers();
  // const ranking = dummyRankedUsers; // todo: バックエンドから取得
  return {
    props: { ranking },
    revalidate: 10,
  };
};

export default Index;
