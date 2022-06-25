import { useResetRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { axios } from "./config";

export type SignUpParams = {
  userId: string;
  userName: string;
  prefectureId: number;
};

export const signUp = async (params: SignUpParams) => {
  const res = await axios.post("/api/signup", JSON.stringify(params));
  return res.data;
};

export type SignInParams = {
  userId: string;
};

export const signIn = async (params: SignInParams) => {
  const res = await axios.post("/api/signin", JSON.stringify(params));
  return res.data;
};

// 本来はapiに関わる処理であるためこのファイルに記載
export const signOut = async () => {
  const resetUser = useResetRecoilState(userState);
  resetUser();
  return;
};
