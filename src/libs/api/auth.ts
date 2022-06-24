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
