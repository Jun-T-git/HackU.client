import React, { MouseEventHandler, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import JapanMap from "~/components/japanMap";
import Drawer from "~/components/dialog/drawer";
import List from "~/components/list/list";
import Search from "~/components/search/search";
import "react-spring-bottom-sheet/dist/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import DropDown from "~/components/menu/dropdown";
import { User, UsersByPrefecture } from "~/types/user";
import { Geo } from "~/types/geo";
import { getMapPaths, getUsersByPrefecture } from "~/libs/functions/users";
import { getGeo } from "~/libs/functions/geo";
import { Edge, PrefectureColors } from "~/types/connection";
import { getAllEdges, getPrefectureColors } from "~/libs/functions/connection";
import ConnectStatusModal, {
  UserToConnect,
} from "~/components/modal/connectStatusModal";

type Props = {
  usersByPrefecture: UsersByPrefecture | null;
  geo: Geo;
  allEdges: Edge[];
  prefectureColors: PrefectureColors;
};

const Index: NextPage<Props> = ({
  usersByPrefecture,
  geo,
  allEdges,
  prefectureColors,
}) => {
  const signedInUser = useRecoilValue(userState);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [drawerHeader, setDrawerHeader] = useState<string>("");
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [userToConnect, setUserToConnect] = useState<UserToConnect>(null);
  const [isEdgeVisible, setIsEdgeVisible] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (
      router.isReady &&
      router.query.userId &&
      signedInUser.userId != router.query.userId
    ) {
      console.log(signedInUser.userId, router.isReady, router.query.userId); //todo: 削除
      router.push("/");
    }
  }, [signedInUser.userId, router.isReady, router.query.userId]);

  if (
    !router.isReady ||
    !usersByPrefecture ||
    !geo ||
    signedInUser.userId != router.query.userId
  ) {
    return (
      <span className="flex justify-center py-5 text-[#555555]">
        Loading...
      </span>
    );
  }

  const onClickPrefecture = async (prefecture: string, users: User[]) => {
    setSelectedPrefecture(prefecture);
    setDisplayedUsers(users);
    setDrawerHeader(prefecture);
    setIsDrawerOpen(true);
  };

  const onClickOutside: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPrefecture("");
      setDisplayedUsers([]);
      setDrawerHeader("");
      setIsDrawerOpen(false);
    }
  };

  const onSubmitSearch = (keyword: string, users: User[]) => {
    setSelectedPrefecture("");
    setDisplayedUsers(users);
    setDrawerHeader(`「${keyword}」の検索結果`);
    setIsDrawerOpen(true);
  };

  const onClickConnect = async (toUserId: string, toUserName: string) => {
    setUserToConnect({ userId: toUserId, userName: toUserName });
    setIsConnectModalOpen(true);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="z-30 h-[70px] w-full px-2 py-3">
        <div className="flex items-center gap-3.5">
          <Search
            onSearch={onSubmitSearch}
            allUsers={Object.values(usersByPrefecture).flat()}
            className="flex-grow"
          />
          <DropDown userId={router.query.userId}>
            <Image src="/image/hamburger-menu.svg" width="28px" height="28px" />
          </DropDown>
        </div>
      </div>

      <div>
        <div className="flex justify-end px-2 py-3">
          <button
            className={`flex items-center justify-center rounded border border-[#888888] p-2 ${
              isEdgeVisible && "opacity-30"
            }`}
            onClick={() => {
              setIsEdgeVisible((prev) => !prev);
            }}
          >
            <Image src="/image/edge.svg" width="20px" height="20px" />
          </button>
        </div>
        <div className="flex justify-center">
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
                  prefectureColors={prefectureColors}
                  isEdgeVisible={isEdgeVisible}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
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
        snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.9]}
      >
        <ul className="flex flex-col py-3 px-5 text-center">
          <List
            users={displayedUsers}
            displayMode="connect"
            onClickConnect={(id, name) => onClickConnect(id, name)}
          />
        </ul>
      </Drawer>
      <ConnectStatusModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        userId={router.query.userId}
        userToConnect={userToConnect}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = await getMapPaths();
  const paths = ["/id125/map"];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const usersByPrefecture = await getUsersByPrefecture();
  const geo = getGeo();
  const allEdges = await getAllEdges();
  const userId = params.userId as string;
  const prefectureColors = await getPrefectureColors(userId);
  return {
    props: { usersByPrefecture, geo, allEdges, prefectureColors },
    revalidate: 10,
  };
};

export default Index;
