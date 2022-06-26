import { atom } from "recoil";

export type User = {
  userId: string;
  userName: string;
  prefectureId: number;
  point: number;
};

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
