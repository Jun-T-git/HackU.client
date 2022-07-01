export type Edge = {
  nodes: [string, string]; // [都道府県名, 都道府県名]
  color: string;
};

export type PrefectureColors = {
  [name: string]: string; // 都道府県名：カラーコード
};

export type ConnectLog = {
  userName: string;
  prefectureName: string;
  connectedAt: string;
  status: string;
  isFirst: boolean;
  point: number;
};

export type ConnectedUsers = {
  [userId: string]: string; // online | offline | both
};
