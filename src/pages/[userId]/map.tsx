import React, { MouseEventHandler, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import JapanMap from "~/components/japanMap";
import Swal from "sweetalert2";
import Drawer from "~/components/dialog/drawer";
import List from "~/components/list/list";
import Search from "~/components/search/search";
import Modal from "~/components/modal/modal";
import Button from "~/components/button/button";
import "react-spring-bottom-sheet/dist/style.css";
import { useRecoilValue } from "recoil";
import { userState } from "~/libs/recoil/user";
import DropDown from "~/components/menu/dropdown";
import { User, UsersByPrefecture } from "~/types/user";
import { Geo } from "~/types/geo";
import { getUsersByPrefecture } from "~/libs/functions/users";
import { getGeo } from "~/libs/functions/geo";
import { Edge, PrefectureColors } from "~/types/connection";
import { getAllEdges, getPrefectureColors } from "~/libs/functions/connection";

type Props = {
  usersByPrefecture: UsersByPrefecture | null;
  geo: Geo;
  allEdges: Edge[];
  prefectureColors: PrefectureColors;
};

const connectRadioValue = [
  { id: 1, item: "会って話した", value: "onLine" },
  { id: 2, item: "オフラインで話した", value: "offLine" },
];

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
  const [connectToUser, setConnectToUser] = useState<object>({
    toUserId: "",
    toUserName: "",
  });
  const [isEdgeVisible, setIsEdgeVisible] = useState<boolean>(false);
  const [checkedValue, setCheckedValue] = useState(
    connectRadioValue[0]["item"]
  );
  const router = useRouter();
  const isReady = router.isReady;
  const userId = router.query.userId;

  useEffect(() => {
    if (signedInUser.userId != userId) {
      router.push("/");
    }
  }, [signedInUser.userId]);

  if (!isReady || !usersByPrefecture || !geo || signedInUser.userId != userId) {
    return (
      <div className="min-h-screen bg-[#222222] py-5 text-center text-[#555555]">
        Loading...
      </div>
    );
  }

  const handleChangeRadio = (e) => setCheckedValue(e.target.value);
  function closeModal() {
    setIsConnectModalOpen(false);
  }
  function cancelConnect() {
    Swal.fire({
      title: "つながりの記録をキャンセルしました",
      icon: "info",
      showConfirmButton: false,
      timer: 1000,
    });
    closeModal();
  }
  const RadioItems = connectRadioValue.map((value, index) => {
    return (
      <li key={index} className="m-5 list-none">
        <label>
          <input
            type="radio"
            value={value.item}
            onChange={handleChangeRadio}
            checked={checkedValue === value.item}
          />
          {value.item}
        </label>
      </li>
    );
  });

  const buttons = (connectUser, cancelConnect) => {
    return (
      <div className="w-[100%]">
        <Button
          className="m-2  inline-flex w-[40%] justify-center rounded px-1 py-1.5 hover:opacity-50"
          styleType="outlined"
          type="button"
          onClick={cancelConnect}
        >
          キャンセル
        </Button>
        <Button
          className="m-2 inline-flex w-[40%] justify-center rounded px-1 py-1.5 hover:opacity-50"
          type="button"
          onClick={connectUser}
        >
          確定
        </Button>
      </div>
    );
  };
  const modalText =
    connectToUser["toUserName"] + "とのつながりを記録しますか？";

  const setConnecModalState = (modalState: boolean) => {
    setIsConnectModalOpen(modalState);
  };
  const connectUser = () => {
    //つながる処理を記述
    Swal.fire({
      title: connectToUser["toUserName"] + "とのつながりを\n記録しました!",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    const connectState = connectRadioValue.filter(
      (dummyData) => dummyData.item === checkedValue
    )[0].value;
    console.log(connectToUser["toUserName"], connectState);
    setConnecModalState(false);
  };

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

  const onClickConnect = (toUserId: string, toUserName: string) => {
    if (toUserName !== "") {
      const toUser = { toUserId: toUserId, toUserName: toUserName };
      setConnectToUser(toUser);
      setConnecModalState(true);
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#222222] text-center">
        <div className="fixed top-0 z-30 h-[70px] w-full px-2 py-3">
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
            <Modal
              modalText={modalText}
              isOpen={isConnectModalOpen}
              setIsOpen={(modalState) => {
                setConnecModalState(modalState);
              }}
            >
              <div className="mt-2">{RadioItems}</div>
              <div className="mt-4">{buttons(connectUser, cancelConnect)}</div>
            </Modal>
          </div>
        </div>

        <div className="pt-[70px]">
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
              onClickConnect={(id, name) => onClickConnect(id, name)}
            />
          </ul>
        </Drawer>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
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
