import { UsersByPrefecture } from "~/types/user";
import { fetchUsersByPrefecture, searchUsers } from "../api/user";
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

export const getMapPaths = async (): Promise<string[]> => {
  const { users } = await searchUsers({});
  const paths = users.map(({ userId }) => `/${userId}/map`);
  return paths;
};

export const getLogoPaths = async (): Promise<string[]> => {
  const { users } = await searchUsers({});
  const paths = users.map(({ userId }) => `/${userId}/logo`);
  return paths;
};
