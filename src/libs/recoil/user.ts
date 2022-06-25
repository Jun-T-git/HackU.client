import { atom } from "recoil";
import { User } from "~/types/user";

const defaultUser: User = {
  userId: null,
  userName: null,
  prefectureId: null,
  point: null,
};

export const userState = atom<User>({
  key: "userState",
  default: defaultUser,
});
