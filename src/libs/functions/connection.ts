import { Edge } from "~/types/connection";
import { fetchAllConnections } from "../api/connection";
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
        Math.floor(connections[row][col] * 255 + 16),
        255
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
