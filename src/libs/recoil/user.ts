import { atom } from "recoil";

export type User = {
  userId: string;
  userName: string;
  prefectureId: number;
  point: number;
};

export const userState = atom<User>({
  key: "userState",
  default: {
    userId: null,
    userName: null,
    prefectureId: null,
    point: null,
  },
});
