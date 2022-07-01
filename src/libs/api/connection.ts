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

type MakeConnectionParams = {
  userId1: string;
  userId2: string;
  status: string; // "offline" or "online"
};

export const makeConnection = async (params: MakeConnectionParams) => {
  const res = await axios.post("/api/connection", params);
  return res;
};

type LogParams = {
  userId: string;
};

export const fetchLog = async (params: LogParams) => {
  const res = await axios.post("/api/log", params);
  return res.data;
};
