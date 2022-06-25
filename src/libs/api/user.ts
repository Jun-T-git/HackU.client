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
