import { axios, handleError } from "./config";

export type SignUpParams = {
  userId: string;
  userName: string;
  prefectureId: number;
};

export const signUp = async (params: SignUpParams) => {
  const res = await axios
    .post("/api/signup", params)
    .catch((e) => {
      throw Error(e);
    })
    .then(handleError)
    .then((res) => res.json());
  console.log(res);
  return res;
};

export type SignInParams = {
  userId: string;
};

export const signIn = async (params: SignInParams) => {
  const res = await axios
    .post("/api/signin", params)
    .catch((e) => {
      throw Error(e);
    })
    .then(handleError)
    .then((res) => res.json());
  console.log(res);
  return res;
};
