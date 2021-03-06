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
import { ConnectedUsers, Edge, PrefectureColors } from "~/types/connection";
import {
  getAllEdges,
  getConnectedUsers,
  getPrefectureColors,
} from "~/libs/functions/connection";
import ConnectStatusModal, {
  UserToConnect,
} from "~/components/modal/connectStatusModal";
import { fetchConnectionsByUser } from "~/libs/api/connection";

type Props = {
  usersByPrefecture: UsersByPrefecture | null;
  geo: Geo;
  allEdges: Edge[];
  staticPrefectureColors: PrefectureColors;
  staticConnectedUsers: ConnectedUsers;
};

const Index: NextPage<Props> = ({
  usersByPrefecture,
  geo,
  allEdges,
  staticPrefectureColors,
  staticConnectedUsers,
}) => {
  const signedInUser = useRecoilValue(userState);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [drawerHeader, setDrawerHeader] = useState<string>("");
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [userToConnect, setUserToConnect] = useState<UserToConnect>(null);
  const [isEdgeVisible, setIsEdgeVisible] = useState<boolean>(false);
  const [prefectureColors, setPrefectureColors] = useState<PrefectureColors>(
    staticPrefectureColors
  );
  const [connectedUsers, setConnectedUsers] =
    useState<ConnectedUsers>(staticConnectedUsers);

  const router = useRouter();

  useEffect(() => {
    if (
      router.isReady &&
      router.query.userId &&
      signedInUser.userId != router.query.userId
    ) {
      router.push("/");
    }
  }, [signedInUser.userId, router.isReady, router.query.userId]);

  useEffect(() => {
    (async () => {
      const connectionsByUser = await fetchConnectionsByUser({
        userId: router.query.userId as string,
      });
      setPrefectureColors(getPrefectureColors(connectionsByUser));
      setConnectedUsers(getConnectedUsers(connectionsByUser));
    })();
  }, [isConnectModalOpen]);

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
    setDrawerHeader(`???${keyword}??????????????????`);
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
              <div className="min-h-[50vh] w-full">
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
      <div className="flex flex-col gap-y-1 rounded py-5 px-5 text-xs">
        <div className="flex gap-x-2">
          <span className="font-bold text-[#ffaa00]">???</span>
          <span className="text-[#aaaaaa]">??????????????????????????????</span>
        </div>
        <div className="flex gap-x-2">
          <span className="font-bold text-[#00aaff]">???</span>
          <span className="text-[#aaaaaa]">???????????????????????????????????????</span>
        </div>
        <div className="flex gap-x-2">
          <span className="text-[#ffaa00]">???</span>
          <span className="text-[#aaaaaa]">??????????????????????????????????????????</span>
        </div>
        <div className="flex gap-x-2">
          <span className="text-[#00aaff]">???</span>
          <span className="text-[#aaaaaa]">
            ??????????????????????????????????????????????????????
          </span>
        </div>
        <div className="flex gap-x-2">
          <span className="text-[#ccffcc]">???</span>
          <span className="text-[#aaaaaa]">
            ????????????????????????????????????????????????????????????????????????
          </span>
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
            connectedUsers={connectedUsers}
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
  const usersByPrefecture = await getUsersByPrefecture();
  const geo = getGeo();
  const allEdges = await getAllEdges();
  const userId = params.userId as string;
  const connectionsByUser = await fetchConnectionsByUser({ userId: userId });
  const prefectureColors = getPrefectureColors(connectionsByUser);
  const connectedUsers = getConnectedUsers(connectionsByUser);
  return {
    props: {
      usersByPrefecture,
      geo,
      allEdges,
      prefectureColors,
      connectedUsers,
    },
    revalidate: 10,
  };
};

export default Index;
