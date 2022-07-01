import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import { ConnectLog } from "~/types/connection";
import { getConnectLogs, getPointThisMonth } from "~/libs/functions/connection";
import LogList from "~/components/list/logList";
import { getLogoPaths } from "~/libs/functions/users";
import Header from "~/components/header/header";

type Props = {
  connectLogs: ConnectLog[];
};

const Index: NextPage<Props> = ({ connectLogs }) => {
  const signedInUser = useRecoilValue(userState);

  const router = useRouter();

  useEffect(() => {
    if (
      router.isReady &&
      router.query.userId != "" &&
      signedInUser.userId != router.query.userId
    ) {
      router.push("/");
    }
  }, [signedInUser.userId, router.query.userId, router.isReady]);

  if (
    !router.isReady ||
    !connectLogs ||
    signedInUser.userId != router.query.userId
  ) {
    return (
      <span className="flex justify-center py-5 text-[#555555]">
        Loading...
      </span>
    );
  }

  const pointThisMonth = getPointThisMonth(connectLogs);

  return (
    <>
      <div className="text-center">
        <Header userId={router.query.userId} />
        <div className="flex flex-col gap-y-5 px-5 pb-20">
          <div>
            <h2 className="mb-2 text-lg font-bold text-white">
              あなたのつながりポイント
            </h2>
            <div className="mx-auto flex flex-col justify-center gap-y-0.5 rounded-md bg-white px-5 py-2 align-baseline">
              <span className="text-lg font-bold text-[#333333]">
                {signedInUser.point} pt
              </span>
              <span
                className={`text-xs ${
                  pointThisMonth > 0 ? "text-red-600" : "text-[#777777]"
                }`}
              >
                （ 前月比 +{pointThisMonth}pt ）
              </span>
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-white">
              過去のつながり
            </h2>
            <LogList connectLogs={connectLogs} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = await getLogoPaths();
  const paths = [
    "/id120/map",
    "/id121/map",
    "/id122/map",
    "/id123/map",
    "/id124/map",
    "/id125/map",
    "/id126/map",
    "/id127/map",
    "/id128/map",
    "/id129/map",
    "/id130/map",
    "/id131/map",
    "/id132/map",
    "/id133/map",
    "/id134/map",
    "/id135/map",
    "/id136/map",
    "/id137/map",
    "/id138/map",
    "/id139/map",
    "/id140/map",
  ];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userId = params.userId as string;
  const connectLogs = await getConnectLogs(userId);
  return {
    props: { connectLogs },
    revalidate: 10,
  };
};

export default Index;
