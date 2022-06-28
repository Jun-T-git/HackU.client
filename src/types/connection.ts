export type Edge = {
  nodes: [string, string]; // [都道府県名, 都道府県名]
  color: string;
};

export type PrefectureColors = {
  [name: string]: string; // 都道府県名：カラーコード
};
