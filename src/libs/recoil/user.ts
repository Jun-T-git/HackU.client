import { atom } from "recoil";
import { User } from "~/types/user";
import { recoilPersist } from "recoil-persist"; //追加

const defaultUser: User = {
  userId: null,
  userName: null,
  prefectureId: null,
  point: null,
};

const { persistAtom } = recoilPersist({
  key: "userStatePersist",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export const userState = atom<User>({
  key: "userState",
  default: defaultUser,
  effects_UNSTABLE: [persistAtom],
});
