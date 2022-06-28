import React, { useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import "react-spring-bottom-sheet/dist/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import { ConnectLog } from "~/types/connection";
import { getConnectLogs } from "~/libs/functions/connection";
import LogCard from "~/components/card/logCard";
import DropDown from "~/components/menu/dropdown";
import LogList from "~/components/list/logList";

type Props = {
  connectLogs: ConnectLog[];
};

const Index: NextPage<Props> = ({ connectLogs }) => {
  const signedInUser = useRecoilValue(userState);

  const router = useRouter();
  const isReady = router.isReady;
  const userId = router.query.userId;

  useEffect(() => {
    if (signedInUser.userId != userId) {
      router.push("/");
    }
  }, [signedInUser.userId]);

  if (!isReady || !connectLogs || signedInUser.userId != userId) {
    return (
      <div className="min-h-screen bg-[#222222] py-5 text-center text-[#555555]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#222222] text-center">
        <div className="fixed top-0 z-30 h-[70px] w-full px-2 py-3">
          <div className="flex items-center justify-between gap-3.5">
            <Link href={`/${userId}/map`}>
              <a>
                <Image
                  src="/logo/logo_light01.svg"
                  width="140px"
                  height="35px"
                  alt="COM.PY-logo"
                />
              </a>
            </Link>
            <DropDown>
              <Image
                src="/image/hamburger-menu.svg"
                width="28px"
                height="28px"
              />
            </DropDown>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 px-5 pt-[70px]">
          <div>
            <h2 className="mb-2 text-lg font-bold text-white">
              あなたのつながりポイント
            </h2>
            <div className="mx-auto rounded-md bg-white px-5 py-2 text-center text-lg font-bold text-[#333333]">
              {signedInUser.point}pt
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
  // const paths = await getMapPaths();
  const paths = ["/id125/log"];
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
