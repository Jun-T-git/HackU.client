import React, { useEffect, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import geoData from "~/libs/constants/japan.json";

export type Edge = {
  nodes: [string, string]; // [都道府県名, 都道府県名]
  color: string;
};

type Prefectures = {
  [name: string]: {
    name: string;
    centroid: [number, number];
    d: string;
  };
};

type Props = {
  edges: Edge[];
};

const WIDTH = 390;
const HEIGHT = 420;
const FILL_COLOR = "#555555";
const STROKE_COLOR = "#333333";

const JapanMap: React.VFC<Props> = ({ edges }) => {
  const [prefectures, setPrefectures] = useState<Prefectures>({});

  const projection = () => {
    return geoMercator().scale(1200).center([151, 37]);
  };
  const path = geoPath().projection(projection());

  useEffect(() => {
    // データ取得
    const features = feature(geoData, geoData.objects.japan).features;
    // オブジェクト形式に変換
    const prefectureObjects: Prefectures = features.reduce(
      (prefectureObjects, d, i) => ({
        ...prefectureObjects,
        [d.properties.name_ja || `object-${i}`]: {
          name: d.properties.name_ja,
          centroid: path.centroid(d),
          d: path(d),
        },
      }),
      {}
    );
    setPrefectures(prefectureObjects);
    console.log(prefectureObjects);
  }, []);

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <g className="prefectures">
        {Object.keys(prefectures)?.map((key, i) => {
          const prefecture = prefectures[key];
          return (
            <path
              onMouseOver={() => {
                console.log(prefecture.name);
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
        {Object.keys(prefectures).length &&
          edges.map((edge, i) => {
            const centroid1 = prefectures[edge.nodes[0]].centroid;
            const centroid2 = prefectures[edge.nodes[1]].centroid;
            return (
              <g key={`connection-${i}`}>
                <path
                  d={`M${centroid1[0]},${centroid1[1]} L${centroid2[0]},${centroid2[1]}`}
                  stroke={edge.color}
                  strokeWidth={1}
                />
                <circle
                  cx={centroid1[0]}
                  cy={centroid1[1]}
                  r="2"
                  fill={edge.color}
                />
                <circle
                  cx={centroid2[0]}
                  cy={centroid2[1]}
                  r="2"
                  fill={edge.color}
                />
              </g>
            );
          })}
      </g>
    </svg>
  );
};

export default JapanMap;
