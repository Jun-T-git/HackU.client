import { ConnectLog, Edge, PrefectureColors } from "~/types/connection";
import {
  fetchAllConnections,
  fetchConnectionsByUser,
  fetchLog,
} from "../api/connection";
import { getPrefectureNameById } from "./prefecture";

const OFFLINE_COLOR = "#ffaa00";
const ONLINE_COLOR = "#00aaff";

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
        Math.floor(connectionValue * 255 * 0.9 + 25),
        255
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
      const prefectureColor0d = hex2rgba(offlineColor).map((value, i) => {
        if (i == 3 && value > 0 && hex2rgba(onlineColor)[i] > 0) {
          return Math.min((value + hex2rgba(onlineColor)[i]) / 2, 255);
        }
        return value + hex2rgba(onlineColor)[i];
      });
      const maxValue = prefectureColor0d
        .slice(0, -1)
        .reduce((val1, val2) => (val1 > val2 ? val1 : val2));
      const normalized0d = prefectureColor0d.map((value, i) => {
        if (i == 3) {
          return value;
        }
        return Math.min((value / maxValue) * 255, 255);
      });
      return { ...prefectureColors, [name]: rgba2hex(normalized0d) };
    },
    {}
  );
  return prefectureColors;
};

const rgba2hex = (rgba: number[]): string => {
  const intRgba = rgba.map((value) => Math.floor(value));
  return (
    "#" +
    intRgba
      .map(function (value) {
        return ("0" + value.toString(16)).slice(-2);
      })
      .join("")
  );
};

const hex2rgba = (hex: string): number[] => {
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

export const getConnectLogs = async (userId: string): Promise<ConnectLog[]> => {
  const connectionsByUser = await fetchConnectionsByUser({ userId: userId });
  const offlineConnections = connectionsByUser["offline_connections_detail"];
  const onlineConnections = connectionsByUser["online_connections_detail"];
  // const connectionsByUser = await fetchLog({ userId: userId });
  // const offlineConnections = connectionsByUser["offline_log"];
  // const onlineConnections = connectionsByUser["online_log"];
  const offlineLogs = offlineConnections
    .map((connectedUsers, prefectureId) => {
      return connectedUsers.map((connectedUser) => {
        return {
          userName: connectedUser.userName,
          prefectureName: getPrefectureNameById(prefectureId),
          connectedAt:
            connectedUser.updatedBy && formatDate(connectedUser.updatedBy),
          status: "offline",
          isFirst: connectedUser.createdBy == connectedUser.updatedBy,
          point: connectedUser.point,
        };
      });
    })
    .flat();
  const onlineLogs = onlineConnections
    .map((connectedUsers, prefectureId) => {
      return connectedUsers.map((connectedUser) => {
        return {
          userName: connectedUser.userName,
          prefectureName: getPrefectureNameById(prefectureId),
          connectedAt:
            connectedUser.updatedBy && formatDate(connectedUser.updatedBy),
          status: "online",
          isFirst: connectedUser.createdBy == connectedUser.updatedBy,
          point: connectedUser.point,
        };
      });
    })
    .flat();
  const connectLogs = offlineLogs.concat(onlineLogs).sort((log1, log2) => {
    return log1.connectedAt > log2.connectedAt ? -1 : 1;
  });
  return connectLogs;
};

export const getToday = () => {
  const rightNow = new Date();
  const dateStringArray = rightNow.toLocaleDateString().split("/"); // ex: [2022,7,1]
  const year = dateStringArray[0];
  const month = ("0" + dateStringArray[1]).slice(-2);
  const date = ("0" + dateStringArray[2]).slice(-2);
  const formattedDate = `${year}/${month}/${date}`;
  return formattedDate; // ex: 2022/07/01
};

export const getPointThisMonth = (connectLogs: ConnectLog[]) => {
  const thisMonth = getToday().slice(0, 7); // ex: 2022/07
  let pointThisMonth = 0;
  for (const connectLog of connectLogs) {
    if (connectLog.connectedAt.slice(0, 7) != thisMonth) {
      break;
    }
    pointThisMonth += connectLog.point;
  }
  return pointThisMonth;
};

export const formatDate = (date: string) => {
  return date.slice(0, 10).replaceAll("-", "/"); // ex: 2022/07/01
};
