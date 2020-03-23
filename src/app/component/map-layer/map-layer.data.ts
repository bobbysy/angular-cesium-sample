import { MapLayerProviderOptions } from "angular-cesium";

export interface MapLayerData {
  id: string;
  provider: MapLayerProviderOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  show: boolean;
}

export const mapLayerDataList: MapLayerData[] = [
  {
    id: "ArcGisMapServer",
    provider: MapLayerProviderOptions.ArcGisMapServer,
    options: {
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
    },
    show: true,
  },
  // {
  //   id: "OpenStreetMap",
  //   provider: MapLayerProviderOptions.OpenStreetMap,
  //   options: {
  //     url: "https://a.tile.openstreetmap.org/"
  //   },
  //   show: true
  // },
  {
    id: "UrlTemplateImagery",
    provider: MapLayerProviderOptions.UrlTemplateImagery,
    options: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      credit:
        "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    },
    show: true,
  },
];

export default "mapLayerDataList";
