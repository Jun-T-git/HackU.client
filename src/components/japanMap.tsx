import React, { MouseEventHandler } from "react";
import { Edge, PrefectureColors } from "~/types/connection";
import { Geo } from "~/types/geo";
import { User, UsersByPrefecture } from "~/types/user";

type Props = {
  edges: Edge[];
  focusedPrefecture: string;
  onClickPrefecture: (prefecture: string, users?: User[]) => void;
  onClickOutside: MouseEventHandler;
  usersByPrefecture: UsersByPrefecture;
  geo: Geo;
  isEdgeVisible?: boolean;
  prefectureColors?: PrefectureColors;
};

const WIDTH = 500;
const HEIGHT = 500;
const FILL_COLOR_DEFAULT = "#404040";
const STROKE_COLOR = "#333333";
const FOCUSED_COLOR = "#aaaaaa";

const JapanMap: React.VFC<Props> = ({
  edges,
  focusedPrefecture,
  onClickPrefecture,
  onClickOutside,
  usersByPrefecture,
  geo,
  isEdgeVisible = true,
  prefectureColors = {},
}) => {
  return (
    <svg width={WIDTH} height={HEIGHT} onClick={onClickOutside}>
      <g>
        {Object.keys(geo)?.map((key, i) => {
          const prefecture = geo[key];
          const filledColor = Object.keys(prefectureColors).includes(
            prefecture.name
          )
            ? prefectureColors[prefecture.name]
            : FILL_COLOR_DEFAULT;
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
              stroke={STROKE_COLOR}
              strokeWidth={0.5}
              fill={filledColor}
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
            stroke={FOCUSED_COLOR}
            strokeWidth={0.5}
            fill={
              Object.keys(prefectureColors).includes(focusedPrefecture)
                ? prefectureColors[focusedPrefecture]
                : FILL_COLOR_DEFAULT
            }
          />
        )}
        {isEdgeVisible &&
          Object.keys(geo).length &&
          edges.map((edge, i) => {
            const centroid1 = geo[edge.nodes[0]].centroid;
            const centroid2 = geo[edge.nodes[1]].centroid;
            const color = edge.nodes.includes(focusedPrefecture)
              ? edge.color.slice(0, -2) + "dd"
              : edge.color;
            return (
              <g key={`connection-${i}`}>
                <path
                  d={`M${centroid1[0]},${centroid1[1]} L${centroid2[0]},${centroid2[1]}`}
                  stroke={color}
                  strokeWidth={0.5}
                  className="pointer-events-none"
                />
                <circle
                  cx={centroid1[0]}
                  cy={centroid1[1]}
                  r="1"
                  fill={color}
                  className="pointer-events-none"
                />
                <circle
                  cx={centroid2[0]}
                  cy={centroid2[1]}
                  r="1"
                  fill={color}
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
