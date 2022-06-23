import React, { useState } from "react";
import Link from "next/link";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import JapanMap, { Edge } from "~/components/japanMap";
import Drawer from "~/components/dialog/drawer";
import List from "~/components/list/list";
import Search from "~/components/search/search";
import { dummyUsers } from "~/ts/dummy";
import "react-spring-bottom-sheet/dist/style.css";

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
let searchType = "";
let drawerHeader = "";
let user = [];

const Index: React.VFC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");
  const [searchUserName, setSearchUserName] = useState<string>("");

  const onClickPrefecture = (prefecture: string) => {
    searchType = "prefecture";
    setSelectedPrefecture(prefecture);
    setIsDrawerOpen(true);
  };
  const onClickConnect = (toUser: string) => {
    if (toUser !== "") {
      alert(toUser+"とつながりますか？");
    }
    setIsDrawerOpen(false);
  }
  const onSubmitSearch = (userName: string) => {
    searchType = "userName";
    setSearchUserName(userName);
    setIsDrawerOpen(true);
  }
  console.log(searchType)
  if (selectedPrefecture && searchType === "prefecture") {
    user = dummyUsers.filter(dummyData => dummyData.prefecture === selectedPrefecture);
    drawerHeader = selectedPrefecture
  } else if (searchUserName && searchType === "userName") {
    user = dummyUsers.filter(dummyData => dummyData.name === searchUserName);
    drawerHeader = "検索結果"
  }

  return (
    <>
      <div className="min-h-screen bg-[#222222] text-center">
        <ul className="flex justify-end gap-3.5 py-4 px-3">
          <li className="float-left">
            <Search
              searchUser={onSubmitSearch}
              className="top-0 px-0"
            />
          </li>
          <li>
            <Link href="/signup">
              <a className="rounded border border-gray-300 px-3 py-2.5 font-bold text-gray-300">
                新規登録
              </a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a className="rounded border border-gray-300 px-3 py-2.5 font-bold text-gray-300">
                ログイン
              </a>
            </Link>
          </li>
        </ul>

        <div className="flex justify-center py-5">
          <TransformWrapper wheel={{ step: 0.05 }}>
            <TransformComponent>
              <div className="min-h-[80vh] w-full">
                <JapanMap
                  edges={edges}
                  focusedPrefecture={selectedPrefecture}
                  onClickPrefecture={onClickPrefecture}
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
            <span className="mt-1 block w-full rounded bg-[#fe133c] py-1 font-bold text-white">
              {drawerHeader}
            </span>
          }
          snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.9]}
        >
          <ul className="flex flex-col py-3 px-5 text-center">
              <List
                listId="user"
                users={user}
                onClickConnect={(name) => onClickConnect(name)}
              />
          </ul>
        </Drawer>
      </div>
    </>
  );
};

export default Index;
