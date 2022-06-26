/* 繋がり関連のfetch関数 */

import { axios } from "./config";

export const fetchAllConnections = async () => {
  const res = await axios.get("/api/all");
  console.log(res.data);
  return res.data;
};
