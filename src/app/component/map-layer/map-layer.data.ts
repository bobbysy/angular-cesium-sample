import { MapLayerProviderOptions } from "angular-cesium";

export interface MapLayerData {
  id: string;
  provider: MapLayerProviderOptions;
  options: {
    url?: string;
    credit?: string;
  };
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
    show: false,
  },
  {
    id: "OpenStreetMap",
    provider: MapLayerProviderOptions.OpenStreetMap,
    options: {
      url: "https://a.tile.openstreetmap.org/",
    },
    show: false,
  },
  {
    id: "CARTO Positron with labels",
    provider: MapLayerProviderOptions.UrlTemplateImagery,
    options: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      credit:
        "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    },
    show: true,
  },
  {
    id: "CARTO Voyager with labels",
    provider: MapLayerProviderOptions.UrlTemplateImagery,
    options: {
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
      credit:
        "Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
    },
    show: false,
  },
  {
    id: "OneMap Night",
    provider: MapLayerProviderOptions.UrlTemplateImagery,
    options: {
      url: "https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png",
      credit:
        '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
    },
    show: false,
  },
  {
    id: "OneMap Default",
    provider: MapLayerProviderOptions.UrlTemplateImagery,
    options: {
      url: "https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png",
      credit:
        '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>',
    },
    show: false,
  },
];

export default "mapLayerDataList";
