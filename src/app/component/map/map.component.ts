import {
  DraggableToMapService,
  MapLayerProviderOptions,
  MapsManagerService,
  SceneMode,
  ViewerConfiguration,
} from "angular-cesium";
import { AfterViewInit, Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  providers: [ViewerConfiguration],
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit {
  sceneMode = SceneMode.SCENE2D;

  Cesium = Cesium;

  @ViewChild("mainMap") mainMap: MapComponent;

  MapLayerProviderOptions = MapLayerProviderOptions;

  constructor(
    private viewerConf: ViewerConfiguration,
    private mapsManagerService: MapsManagerService,
    private draggableToMapService: DraggableToMapService
  ) {
    this.viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      shouldAnimate: false,
      homeButton: false,
      geocoder: true,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      sceneMode: SceneMode.SCENE2D,
      mapMode2D: this.Cesium.MapMode2D.INFINITE_SCROLL,
      mapProjection: new Cesium.WebMercatorProjection(),
      imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
        credit: `Contains information from Weather Forecast accessed on ${new Date()} from <a href='https://www.nea.gov.sg/'>National Environment Agency</a> which is made available under the terms of the <a href='https://data.gov.sg/open-data-licence'>Singapore Open Data Licence version 1.0</a>`,
      }),
    };
    this.viewerConf.viewerModifier = (viewer): void => {
      viewer.screenSpaceEventHandler.removeInputAction(
        this.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    };
  }

  ngAfterViewInit(): void {
    const map = this.mapsManagerService.getMap("main-map");
    map.getCameraService().cameraFlyTo({
      destination: this.Cesium.Cartesian3.fromDegrees(
        103.851959,
        1.29027,
        200000
      ),
      duration: 0,
    });
    // this.draggableToMapService.dragUpdates().subscribe((e) => console.log(e));
  }
}

export default "MapComponent";
