import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import {
  AcEntity,
  AcLayerComponent,
  AcNotification,
  CesiumEvent,
  MapEventsManagerService,
  PickOptions,
} from "angular-cesium";
import { Observable } from "rxjs";
import { WeatherDataServiceProvider } from "../../utils/services/dataProviders/weather-data-service-provider.service";

@Component({
  selector: "app-weather-data-layer",
  templateUrl: "./weather-data-layer.component.html",
  providers: [WeatherDataServiceProvider],
  styleUrls: ["./weather-data-layer.component.scss"],
})
export class WeatherDataLayerComponent implements OnInit {
  @ViewChild(AcLayerComponent, { static: true }) layer: AcLayerComponent;

  private weather$: Observable<AcNotification>;

  private lastPickData: any;

  constructor(
    private ngZone: NgZone,
    private mapEventsManager: MapEventsManagerService,
    public weatherDataServiceProvider: WeatherDataServiceProvider
  ) {
    this.weather$ = weatherDataServiceProvider.get();
  }

  ngOnInit(): void {
    const mouseOverObservable = this.mapEventsManager.register({
      entityType: AcEntity,
      event: CesiumEvent.MOUSE_MOVE,
      pick: PickOptions.PICK_FIRST,
      priority: 2,
    });
    mouseOverObservable.subscribe((event) => {
      const data = event.entities !== null ? event.entities[0] : null;
      if (this.lastPickData && (!data || data.name !== this.lastPickData.id)) {
        this.lastPickData.picked = false;
        this.layer.update(this.lastPickData, this.lastPickData.id);
      }
      if (data && (!this.lastPickData || data.id !== this.lastPickData.id)) {
        data.picked = true;
        this.layer.update(data, data.id);
      }
      this.lastPickData = data;
    });

    // Open dialog on double click
    const doubleClickObservable = this.mapEventsManager.register({
      entityType: AcEntity,
      event: CesiumEvent.LEFT_DOUBLE_CLICK,
      pick: PickOptions.PICK_FIRST,
      priority: 2,
    });
    doubleClickObservable.subscribe((event) => {
      const data = event.entities !== null ? event.entities[0] : null;
      if (data) {
        this.ngZone.run(() => data.forecast);
      }
    });
  }

  pixelOffset = (value) => new Cesium.Cartesian2(value[0], value[1]);

  getTextColor = (): any => Cesium.Color.BLACK;
}

export default "WeatherDataLayerComponent";
