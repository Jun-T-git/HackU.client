import React from "react";
import { ConnectLog } from "~/types/connection";
import LogCard from "../card/logCard";

type Props = {
  connectLogs: ConnectLog[];
};

const LogList: React.VFC<Props> = ({ connectLogs }) => {
  return (
    <div className="rounded-md bg-white">
      <ul className="flex flex-col divide-y">
        {connectLogs.map((connectLog, i) => {
          const withDate =
            i == 0 || connectLog.connectedAt != connectLogs[i - 1].connectedAt;
          return (
            <li key={`log-${i}`}>
              <LogCard {...connectLog} withDate={withDate} />
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-y-1 rounded border-[#777777] py-5 px-5 text-xs">
        <div className="flex gap-x-2">
          <span className="text-red-600">●</span>
          <span className="text-[#555555]">直接会って話した</span>
        </div>
        <div className="flex gap-x-2">
          <span className="text-blue-600">●</span>
          <span className="text-[#555555]">オンラインで話した</span>
        </div>
      </div>
    </div>
  );
};

export default LogList;
