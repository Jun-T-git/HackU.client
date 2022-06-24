import React, { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import JapanMap from "~/components/japanMap";
import Drawer from "~/components/dialog/drawer";
import List from "~/components/list/list";
import Search from "~/components/search/search";
import Modal from "~/components/modal/modal";
import "react-spring-bottom-sheet/dist/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import DropDown from "~/components/menu/dropdown";
import { User, UsersByPrefecture } from "~/types/user";
import { Geo } from "~/types/geo";
import { getUsersByPrefecture } from "~/libs/functions/users";
import { getGeo } from "~/libs/functions/geo";
import { Edge } from "~/types/connection";
import { getAllEdges } from "~/libs/functions/connection";

type Props = {
  usersByPrefecture: UsersByPrefecture;
  geo: Geo;
  allEdges: Edge[];
};

const Index: NextPage<Props> = ({ usersByPrefecture, geo, allEdges }) => {
  const signedInUser = useRecoilValue(userState);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [drawerHeader, setDrawerHeader] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [connectToUser, setConnectToUser] = useState<object>({toUserId: "", toUserName: ""});

  if (!usersByPrefecture || !geo) {
    return <>Loading</>;
  }
  const connectRadioValue = [
    {id: 1, item: "オンライン", value: "onLine"},
    {id: 2, item: "オフライン", value: "offLine"},
  ];

  const setModalState = (modalState: boolean) => {
    setIsOpen(modalState);
  }
  const connectUser = (connectUserName: string, connectValue: string) => {
    //つながる処理を記述
    alert(connectUserName+"と"+connectValue+"でつながりました。");
    const connectState = connectRadioValue.filter(dummyData => dummyData.item === connectValue)[0].value;
    console.log(connectUserName, connectState)
    setModalState(false);
  }
  const onClickPrefecture = async (prefecture: string, users: User[]) => {
    setSelectedPrefecture(prefecture);
    setDisplayedUsers(users);
    setDrawerHeader(prefecture);
    setIsDrawerOpen(true);
  };

  const onSubmitSearch = (keyword: string, users: User[]) => {
    setSelectedPrefecture("");
    setDisplayedUsers(users);
    setDrawerHeader(`「${keyword}」の検索結果`);
    setIsDrawerOpen(true);
  };
  const onClickConnect = (toUserId: string, toUserName: string) => {
    if (toUserName !== "") {
      const toUser = {toUserId: toUserId, toUserName: toUserName};
      setConnectToUser(toUser);
      setModalState(true);
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#222222] text-center">
        <div className="fixed top-0 z-30 h-[70px] w-full px-2 py-3">
          {signedInUser.userId ? (
            /* ログイン時 */
            <div className="flex items-center gap-3.5">
              <Search
                onSearch={onSubmitSearch}
                allUsers={Object.values(usersByPrefecture).flat()}
                className="flex-grow"
              />
              <DropDown>
                <Image
                  src="/image/hamburger-menu.svg"
                  width="28px"
                  height="28px"
                />
              </DropDown>
            </div>
          ) : (
            /* ログアウト時 */
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
          )}
        </div>

        <div className="flex justify-center py-5 pt-[70px]">
          <TransformWrapper wheel={{ step: 0.05 }}>
            <TransformComponent>
              <div className="min-h-[80vh] w-full">
                <JapanMap
                  edges={allEdges}
                  focusedPrefecture={selectedPrefecture}
                  onClickPrefecture={onClickPrefecture}
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
          snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.9]}
        >
          <ul className="flex flex-col py-3 px-5 text-center">
            {signedInUser.userId ? (
              /* ログイン時 */
              <List
                users={displayedUsers}
                onClickConnect={(id, name) => onClickConnect(id, name)}
              />
            ) : (
              /* ログアウト時 */
              <div className="flex flex-col items-center gap-y-3 py-3">
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
            )}
          </ul>
        </Drawer>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const usersByPrefecture = await getUsersByPrefecture();
  const geo = getGeo();
  const allEdges = await getAllEdges();
  return {
    props: { usersByPrefecture, geo, allEdges },
    revalidate: 10,
  };
};

export default Index;
