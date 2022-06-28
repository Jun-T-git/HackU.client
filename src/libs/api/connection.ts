/* 繋がり関連のfetch関数 */

import { axios } from "./config";

export const fetchAllConnections = async () => {
  const res = await axios.get("/api/all");
  return res.data;
};

type ConnectionsByUserParams = {
  userId: string;
};

export const fetchConnectionsByUser = async (
  params: ConnectionsByUserParams
) => {
  const res = await axios.post("/api/connectionByUser", params);
  return res.data;
};
