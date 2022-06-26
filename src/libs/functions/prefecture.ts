import { prefectures } from "../constants/prefectures";

export const getPrefectureNameById = (id: number) => {
  return Object.keys(prefectures)[id]; //id==indexであるため
};

export const getPrefectureIdByName = (name: string) => {
  return prefectures[name];
};
