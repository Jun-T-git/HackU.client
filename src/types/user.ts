export type User = {
  userId: string;
  userName: string;
  prefectureId: number;
  point: number;
};

export type UsersByPrefecture = {
  [prefectureName: string]: User[];
};
