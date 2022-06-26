import { UsersByPrefecture } from "~/types/user";
import { fetchUsersByPrefecture } from "../api/user";
import { prefectures } from "../constants/prefectures";
import { getPrefectureIdByName } from "./prefecture";

export const getUsersByPrefecture = async (): Promise<UsersByPrefecture> => {
  const usersByPrefecture = {};
  for (const prefectureName of Object.keys(prefectures)) {
    const { users } = await fetchUsersByPrefecture({
      prefectureId: getPrefectureIdByName(prefectureName),
    });
    usersByPrefecture[prefectureName] = users;
  }
  return usersByPrefecture;
};
