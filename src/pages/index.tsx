import React, { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import JapanMap, { Edge } from "~/components/japanMap";
import Drawer from "~/components/dialog/drawer";
import List from "~/components/list/list";
import Search from "~/components/search/search";
import "react-spring-bottom-sheet/dist/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import DropDown from "~/components/menu/dropdown";
import { User, UsersByPrefecture } from "~/types/user";
import { Geo } from "~/types/geo";
import { getUsersByPrefecture } from "~/libs/functions/users";
import { getGeo } from "~/libs/functions/geo";

const OFFLINE_COLOR = "#ff000020";
const ONLINE_COLOR = "#00ff0020";

const edges: Edge[] = [
  { nodes: ["広島県", "東京都"], color: ONLINE_COLOR },
  { nodes: ["広島県", "大阪府"], color: ONLINE_COLOR },
  { nodes: ["千葉県", "東京都"], color: ONLINE_COLOR },
  { nodes: ["愛知県", "広島県"], color: ONLINE_COLOR },
  { nodes: ["愛知県", "大阪府"], color: ONLINE_COLOR },
  { nodes: ["北海道", "東京都"], color: ONLINE_COLOR },
  { nodes: ["新潟県", "島根県"], color: ONLINE_COLOR },
  { nodes: ["京都府", "沖縄県"], color: ONLINE_COLOR },
  { nodes: ["大阪府", "広島県"], color: ONLINE_COLOR },
  { nodes: ["大阪府", "広島県"], color: ONLINE_COLOR },
  { nodes: ["青森県", "秋田県"], color: ONLINE_COLOR },
  { nodes: ["岩手県", "佐賀県"], color: ONLINE_COLOR },
  { nodes: ["東京都", "千葉県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "神奈川県"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "大阪府"], color: OFFLINE_COLOR },
  { nodes: ["東京都", "埼玉県"], color: OFFLINE_COLOR },
  { nodes: ["広島県", "岡山県"], color: OFFLINE_COLOR },
  { nodes: ["福岡県", "広島県"], color: OFFLINE_COLOR },
  { nodes: ["高知県", "愛媛県"], color: OFFLINE_COLOR },
  { nodes: ["兵庫県", "長野県"], color: OFFLINE_COLOR },
];

type Props = {
  usersByPrefecture: UsersByPrefecture;
  geo: Geo;
};

const Index: NextPage<Props> = ({ usersByPrefecture, geo }) => {
  const signedInUser = useRecoilValue(userState);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [drawerHeader, setDrawerHeader] = useState<string>("");

  if (!usersByPrefecture || !geo) {
    return <>Loading</>;
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

  const onClickConnect = (toUser: string) => {
    if (toUser !== "") {
      alert(toUser + "とつながりますか？");
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#222222] text-center">
        <div className="fixed top-0 z-30 h-[70px] w-full px-3 py-3">
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
            <div className="flex justify-end gap-3.5">
              <Link href="/signup">
                <a className="rounded border border-[#dddddd] px-3 py-2.5 font-bold text-[#dddddd]">
                  新規登録
                </a>
              </Link>
              <Link href="/signin">
                <a className="rounded border border-[#dddddd] px-3 py-2.5 font-bold text-[#dddddd]">
                  ログイン
                </a>
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-center py-5 pt-[70px]">
          <TransformWrapper wheel={{ step: 0.05 }}>
            <TransformComponent>
              <div className="min-h-[80vh] w-full">
                <JapanMap
                  edges={edges}
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
                onClickConnect={(name) => onClickConnect(name)}
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
  return {
    props: { usersByPrefecture, geo },
    revalidate: 10,
  };
};

export default Index;
