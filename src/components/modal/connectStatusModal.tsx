import { useState } from "react";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { makeConnection } from "~/libs/api/connection";
import { userState } from "~/libs/recoil/user";
import Button from "../button/button";
import RadioField from "../field/radio";
import Modal from "./modal";

export type UserToConnect = {
  userId: string;
  userName: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userToConnect: UserToConnect;
};

const connectRadioOptions = [
  { label: "会って話した", value: "offline" },
  { label: "オンラインで話した", value: "online" },
];

const ConnectStatusModal: React.VFC<Props> = ({
  isOpen,
  onClose,
  userId,
  userToConnect,
}) => {
  const setUser = useSetRecoilState(userState);
  const [connectStatus, setConnectStatus] = useState<string>("");
  const [connectErrorMessage, setConnectErrorMessage] = useState<string>("");

  const connectUser = async () => {
    // チェックがついていない場合
    if (!connectStatus) {
      setConnectErrorMessage("※つながりの種類を選択してください");
      return;
    }
    // つながり申請処理
    const params = {
      userId1: userId,
      userId2: userToConnect?.userId,
      status: connectStatus,
    };
    const { status, data } = await makeConnection(params);
    if (status != 200) {
      setConnectErrorMessage("つながりの記録に失敗しました");
      return;
    }
    setUser((prev) => {
      return { ...prev, point: prev.point + data.point };
    });
    // 申請完了処理
    Swal.fire({
      title: `${userToConnect?.userName}さんとのつながりを記録しました`,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    onClose();
  };

  return (
    <Modal
      modalText={`${userToConnect?.userName}さんとのつながりを記録しますか？`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <span className="font-xs mt-2 mb-5 block text-[#777777]">
        ※ 反映には少し時間がかかります
      </span>
      <RadioField
        className="my-3"
        options={connectRadioOptions}
        value={connectStatus}
        onChange={(e) => setConnectStatus(e.target.value)}
      />
      <span className="my-2 block min-h-[20px] pl-1 text-sm text-red-500">
        {connectErrorMessage}
      </span>
      <div className="flex w-full justify-center gap-x-3">
        <Button
          className="w-[40%] justify-center rounded px-1 py-1.5 hover:opacity-50"
          styleType="outlined"
          type="button"
          onClick={() => onClose()}
        >
          キャンセル
        </Button>
        <Button
          className="w-[40%] justify-center rounded px-1 py-1.5 hover:opacity-50"
          type="button"
          onClick={async () => await connectUser()}
        >
          確定
        </Button>
      </div>
    </Modal>
  );
};

export default ConnectStatusModal;
