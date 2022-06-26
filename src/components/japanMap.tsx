import React from "react";
import { Edge } from "~/types/connection";
import { Geo } from "~/types/geo";
import { User, UsersByPrefecture } from "~/types/user";

type Props = {
  edges: Edge[];
  focusedPrefecture: string;
  onClickPrefecture: (prefecture: string, users: User[]) => void;
  usersByPrefecture: UsersByPrefecture;
  geo: Geo;
};

const WIDTH = 500;
const HEIGHT = 500;
const FILL_COLOR = "#404040";
const STROKE_COLOR = "#333333";
const FOCUSED_COLOR = "#777777";

const JapanMap: React.VFC<Props> = ({
  edges,
  focusedPrefecture,
  onClickPrefecture,
  usersByPrefecture,
  geo,
}) => {
  return (
    <svg width={WIDTH} height={HEIGHT}>
      <g className="prefectures">
        {Object.keys(geo)?.map((key, i) => {
          const prefecture = geo[key];
          return (
            <path
              onClick={() => {
                prefecture.name &&
                  onClickPrefecture(
                    prefecture.name,
                    usersByPrefecture[prefecture.name]
                  );
              }}
              key={`path-${i}`}
              d={prefecture.d}
              className="prefecture"
              fill={FILL_COLOR}
              stroke={STROKE_COLOR}
              strokeWidth={0.5}
            />
          );
        })}
        {focusedPrefecture && (
          <path
            onClick={() => {
              onClickPrefecture(
                geo[focusedPrefecture].name,
                usersByPrefecture[geo[focusedPrefecture].name]
              );
            }}
            key="path-focused"
            d={geo[focusedPrefecture].d}
            className="prefecture"
            fill={FILL_COLOR}
            stroke={FOCUSED_COLOR}
            strokeWidth={0.5}
          />
        )}
        {Object.keys(geo).length &&
          edges.map((edge, i) => {
            const centroid1 = geo[edge.nodes[0]].centroid;
            const centroid2 = geo[edge.nodes[1]].centroid;
            return (
              <g key={`connection-${i}`}>
                <path
                  d={`M${centroid1[0]},${centroid1[1]} L${centroid2[0]},${centroid2[1]}`}
                  stroke={edge.color}
                  strokeWidth={1}
                  className="pointer-events-none"
                />
                <circle
                  cx={centroid1[0]}
                  cy={centroid1[1]}
                  r="2"
                  fill={edge.color}
                  className="pointer-events-none"
                />
                <circle
                  cx={centroid2[0]}
                  cy={centroid2[1]}
                  r="2"
                  fill={edge.color}
                  className="pointer-events-none"
                />
              </g>
            );
          })}
      </g>
    </svg>
  );
};

export default JapanMap;
