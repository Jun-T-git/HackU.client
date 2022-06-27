import { Edge, PrefectureColors } from "~/types/connection";
import { fetchAllConnections, fetchConnectionsByUser } from "../api/connection";
import { getPrefectureNameById } from "./prefecture";

const OFFLINE_COLOR = "#ff8800";
const ONLINE_COLOR = "#0088ff";

export const connectionsToEdges = (
  connections: number[][],
  edgeColor0x: string // 16進数カラーコード（例：#ff00a1）
): Edge[] => {
  const edges = [];
  for (let row = 0; row < 47; row++) {
    for (let col = row + 1; col < 47; col++) {
      if (connections[row][col] == 0) {
        continue;
      }
      const opacity0d = Math.min(
        Math.floor((connections[row][col] * 255) / 2 + 32),
        160
      );
      const opacity0x = ("0" + opacity0d.toString(16)).slice(-2);
      edges.push({
        nodes: [getPrefectureNameById(row), getPrefectureNameById(col)],
        color: edgeColor0x + opacity0x,
      });
    }
  }
  return edges;
};

export const getAllEdges = async (): Promise<Edge[]> => {
  const connectionData = await fetchAllConnections();
  const offlineConnections = connectionData["offline_connections"];
  const onlineConnections = connectionData["online_connections"];
  const offlineEdges = connectionsToEdges(offlineConnections, OFFLINE_COLOR);
  const onlineEdges = connectionsToEdges(onlineConnections, ONLINE_COLOR);
  const allEdges = offlineEdges.concat(onlineEdges);
  return allEdges;
};

export const connectionsToPrefectureColors = (
  connections: number[],
  fillColor0x: string // 16進数カラーコード（例：#ff00a1）
): PrefectureColors => {
  const prefectureColors = connections.reduce(
    (prefectureColors, connectionValue, prefectureId) => {
      if (connectionValue == 0) {
        return { ...prefectureColors };
      }
      const opacity0d = Math.min(
        Math.floor((connectionValue * 255) / 2 + 32),
        160
      );
      const opacity0x = ("0" + opacity0d.toString(16)).slice(-2);
      return {
        ...prefectureColors,
        [getPrefectureNameById(prefectureId)]: fillColor0x + opacity0x,
      };
    },
    {}
  );
  return prefectureColors;
};

export const getPrefectureColors = async (
  userId: string
): Promise<PrefectureColors> => {
  const connectionsByUser = await fetchConnectionsByUser({ userId: userId });
  const offlineConnections = connectionsByUser["offline_connections"];
  const onlineConnections = connectionsByUser["online_connections"];
  const offlineColors = connectionsToPrefectureColors(
    offlineConnections,
    OFFLINE_COLOR
  );
  const onlineColors = connectionsToPrefectureColors(
    onlineConnections,
    ONLINE_COLOR
  );
  const connectedPrefectureNames = Array.from(
    new Set(Object.keys(offlineColors).concat(Object.keys(onlineColors)))
  );

  const prefectureColors = connectedPrefectureNames.reduce(
    (prefectureColors, name) => {
      const offlineColor =
        offlineColors[name] === undefined ? "#00000000" : offlineColors[name];
      const onlineColor =
        onlineColors[name] === undefined ? "#00000000" : onlineColors[name];
      const prefectureColor0d = hex2rgba(offlineColor).map(
        (value, i) => value + hex2rgba(onlineColor)[i]
      );
      return { ...prefectureColors, [name]: rgba2hex(prefectureColor0d) };
    },
    {}
  );
  return prefectureColors;
};

const rgba2hex = (rgba) => {
  return (
    "#" +
    rgba
      .map(function (value) {
        return ("0" + value.toString(16)).slice(-2);
      })
      .join("")
  );
};

const hex2rgba = (hex) => {
  if (hex.slice(0, 1) == "#") hex = hex.slice(1);
  return [
    hex.slice(0, 2),
    hex.slice(2, 4),
    hex.slice(4, 6),
    hex.slice(6, 8),
  ].map((str) => {
    return parseInt(str, 16);
  });
};
