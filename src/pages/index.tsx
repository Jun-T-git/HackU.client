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

  useEffect(() => {
    if (router.isReady && signedInUser.userId) {
      router.push(`/${signedInUser.userId}/map`);
    }
  }, [signedInUser.userId, router.isReady, router.query.userId]);

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

  if (!router.isReady || !usersByPrefecture || !geo || signedInUser.userId) {
    return (
      <span className="flex justify-center py-5 text-[#555555]">
        Loading...
      </span>
    );
  }

  return (
    <>
      <div className="z-30 h-[70px] w-full px-2 py-3">
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
                ????????????
              </a>
            </Link>
            <Link href="/signin">
              <a className="rounded border border-[#dddddd] px-3 py-2.5 text-sm font-bold text-[#dddddd]">
                ????????????
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-5">
        <TransformWrapper wheel={{ step: 0.05 }}>
          <TransformComponent>
            <div className="min-h-[50vh] w-full">
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
      <div className="flex flex-col gap-y-1 rounded py-5 px-5 text-xs">
        <div className="flex gap-x-2">
          <span className="font-bold text-[#ffaa00]">???</span>
          <span className="text-[#aaaaaa]">??????????????????????????????</span>
        </div>
        <div className="flex gap-x-2">
          <span className="font-bold text-[#00aaff]">???</span>
          <span className="text-[#aaaaaa]">???????????????????????????????????????</span>
        </div>
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
            ???????????????????????????????????????????????????????????????????????????????????????
          </span>
          <div className="flex w-full justify-center gap-3.5">
            <Link href="/signup">
              <a className="flex-grow rounded border border-red-500 py-2.5 font-bold text-red-500">
                ????????????
              </a>
            </Link>
            <Link href="/signin">
              <a className="flex-grow rounded border border-red-500 py-2.5 font-bold text-red-500">
                ????????????
              </a>
            </Link>
          </div>
        </div>
      </Drawer>
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
