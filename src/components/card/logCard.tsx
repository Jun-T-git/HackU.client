import React from "react";
import { ConnectLog } from "~/types/connection";

type Props = { withDate: boolean } & ConnectLog;

const LogCard: React.VFC<Props> = ({
  userName,
  prefectureName,
  connectedAt,
  status,
  isFirst,
  withDate,
}) => {
  return (
    <>
      {withDate && (
        <div className="rounded-md bg-[#dddddd] text-xs text-[#777777]">
          {connectedAt}
        </div>
      )}
      <div className="grid grid-cols-10 items-center overflow-hidden rounded-full bg-white py-3 px-5 text-center">
        <span className="col-span-4 justify-self-start font-bold">
          {userName}
        </span>
        <span className="col-span-3 justify-self-start text-sm">
          {prefectureName}
        </span>
        {isFirst ? (
          <span className="col-span-2 justify-self-start text-xs text-[#777777]">
            NEW
          </span>
        ) : (
          ""
        )}
        <span
          className={`col-span-1 justify-self-end text-sm ${
            status == "offline" ? "text-red-600" : "text-blue-600"
          }`}
        >
          ●
        </span>
      </div>
    </>
  );
};

export default LogCard;
