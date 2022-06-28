/* ユーザー関連のfetch関数 */

import { axios } from "./config";

type SearchUsersParams = {
  userIdKey?: string;
  userNameKey?: string;
  prefectureId?: number;
};

export const searchUsers = async (params: SearchUsersParams) => {
  const res = await axios.post("/api/searchUser", params);
  return res.data;
};

type FetchUserParams = {
  userIdKey: string;
};

export const fetchUser = async (params: FetchUserParams) => {
  const res = await axios.post("/api/searchUserByUserIdExactly", params);
  return res.data;
};

type FetchUsersByPrefectureParams = {
  prefectureId: number;
};

export const fetchUsersByPrefecture = async (
  params: FetchUsersByPrefectureParams
) => {
  const res = await axios.post("/api/userByPrefecture", params);
  return res.data;
};

export const rankedUsers = async () => {
  const res = await axios.get("/api/ranking");
  return res.data;
}
