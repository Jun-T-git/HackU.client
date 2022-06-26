import { geoMercator, geoPath } from "d3-geo";
import { Geo } from "~/types/geo";
import { feature } from "topojson-client";
import geoData from "~/libs/constants/japan.json";

export const getGeo = (): Geo => {
  const projection = () => {
    return geoMercator().scale(1200).center([151, 37]);
  };
  const path = geoPath().projection(projection());
  // データ取得
  const features = feature(geoData, geoData.objects.japan).features;
  // オブジェクト形式に変換
  const geo: Geo = features.reduce(
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
  return geo;
};
