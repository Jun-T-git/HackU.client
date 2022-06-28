import React, { MouseEventHandler, useEffect, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import JapanMap from "~/components/japanMap";
import Drawer from "~/components/dialog/drawer";
import "react-spring-bottom-sheet/dist/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import { UsersByPrefecture } from "~/types/user";
import { Geo } from "~/types/geo";
import { getGeo } from "~/libs/functions/geo";
import { Edge } from "~/types/connection";
import { getAllEdges } from "~/libs/functions/connection";
import { prefectures } from "~/libs/constants/prefectures";
import { useRouter } from "next/router";

type Props = {
  usersByPrefecture: UsersByPrefecture;
  geo: Geo;
  allEdges: Edge[];
};

const Index: NextPage<Props> = ({ usersByPrefecture, geo, allEdges }) => {
  const signedInUser = useRecoilValue(userState);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [drawerHeader, setDrawerHeader] = useState<string>("");
  const router = useRouter();
  const isReady = router.isReady;

  useEffect(() => {
    if (signedInUser.userId) {
      router.push(`/${signedInUser.userId}/map`);
    }
  }, [signedInUser.userId]);

  const onClickPrefecture = async (prefecture: string) => {
    setSelectedPrefecture(prefecture);
    setDrawerHeader(prefecture);
    setIsDrawerOpen(true);
  };

  const onClickOutside: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPrefecture("");
      setDrawerHeader("");
      setIsDrawerOpen(false);
    }
  };

  if (!isReady || !usersByPrefecture || !geo || signedInUser.userId) {
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
            <Image
              src="/logo/logo_light01.svg"
              width="140px"
              height="35px"
              alt="COM.PY-logo"
            />
            <div className="flex items-center gap-3">
              <Link href="/signup">
                <a className="rounded border border-[#dddddd] px-3 py-2.5 text-sm font-bold text-[#dddddd]">
                  新規登録
                </a>
              </Link>
              <Link href="/signin">
                <a className="rounded border border-[#dddddd] px-3 py-2.5 text-sm font-bold text-[#dddddd]">
                  ログイン
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-5 pt-[70px]">
          <TransformWrapper wheel={{ step: 0.05 }}>
            <TransformComponent>
              <div className="min-h-[80vh] w-full">
                <JapanMap
                  edges={allEdges}
                  focusedPrefecture={selectedPrefecture}
                  onClickPrefecture={onClickPrefecture}
                  onClickOutside={onClickOutside}
                  usersByPrefecture={usersByPrefecture}
                  geo={geo}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>

        <Drawer
          open={isDrawerOpen}
          onDismiss={() => setIsDrawerOpen(false)}
          blocking={false}
          header={
            <span className="mt-1 block w-full rounded bg-red-500 py-1 font-bold text-white">
              {drawerHeader}
            </span>
          }
          snapPoints={({ maxHeight }) => [maxHeight * 0.3, maxHeight * 0.9]}
        >
          <div className="flex flex-col items-center gap-y-3 py-5 px-5 text-center">
            <span className="text-[#222222 text-sm">
              ユーザー情報の閲覧はログイン中の方にのみご利用いただけます
            </span>
            <div className="flex w-full justify-center gap-3.5">
              <Link href="/signup">
                <a className="flex-grow rounded border border-red-500 py-2.5 font-bold text-red-500">
                  新規登録
                </a>
              </Link>
              <Link href="/signin">
                <a className="flex-grow rounded border border-red-500 py-2.5 font-bold text-red-500">
                  ログイン
                </a>
              </Link>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const usersByPrefecture = Object.keys(prefectures).reduce(
    (usersByPrefecture, prefectureName) => {
      return { ...usersByPrefecture, [prefectureName]: [] };
    },
    {}
  );
  const geo = getGeo();
  const allEdges = await getAllEdges();
  return {
    props: { usersByPrefecture, geo, allEdges },
    revalidate: 10,
  };
};

export default Index;
